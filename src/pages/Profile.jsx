import { useContext, useRef, useState } from "react";

import AuthContext from "../contexts/AuthContext/AuthContext";

import { FaUserNinja } from "react-icons/fa";
import Alert from "../components/Alert";
import { getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function Profile() {
  const inputFileRef = useRef();

  const [avatar, setAvatar] = useState("");

  const { currentUser, updateUserProfile, uploadImage, dispatch } =
    useContext(AuthContext);

  const [email, setEmail] = useState(currentUser.email);

  const [password, setPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const [submitError, setSubmitError] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value.trim());
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (pattern.test(e.target.value) === false) {
      setValidationErrors((prevState) => ({
        ...prevState,
        emailError: true,
      }));
    } else {
      setValidationErrors((prevState) => ({
        ...prevState,
        emailError: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const error of Object.values(validationErrors)) {
      if (error) {
        return;
      }
    }

    try {
      setLoading(true);
      const [v1, v2, image] = await updateUserProfile(email, password, avatar);
      let imageURL;
      if (image) {
        imageURL = await getDownloadURL(image.ref);
        await updateProfile(currentUser, {
          photoURL: imageURL,
        });
      }

      dispatch({
        type: "UPDATE_PROFILE",
        payload: { email, photoURL: imageURL ?? undefined },
      });
      setSubmitMessage("Profile Updated successfully.");
      setPassword("");
    } catch (error) {
      if (error.code == "auth/requires-recent-login") {
        setSubmitError("Please reauthenticate this action needs recent login");
      } else {
        setSubmitError("Failed to update profile.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="mt-5 md:col-span-2 md:mt-0 ">
      {submitError && <Alert type="error" message={submitError} />}
      {submitMessage && <Alert type="success" message={submitMessage} />}
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6  px-4 py-5 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium"
                >
                  Email
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="email"
                    className={`input ${
                      validationErrors.emailError !== undefined &&
                      (validationErrors.emailError === true
                        ? "input-error"
                        : "input-success")
                    }`}
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailInput}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium ">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Type to set a new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Photo</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full ">
                  <span>
                    {avatar ? (
                      <img
                        className="rouned-full w-full"
                        src={URL.createObjectURL(avatar)}
                      />
                    ) : currentUser?.photoURL ? (
                      <img src={currentUser?.photoURL} />
                    ) : (
                      <FaUserNinja
                        color="white"
                        className="rounded-full"
                        size={40}
                      />
                    )}
                  </span>
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-md ml-3"
                  onClick={() => inputFileRef.current.click()}
                >
                  Change
                </button>
                <input
                  type="file"
                  className="ml-5 rounded-md border  py-2 px-3 text-sm font-medium leading-4  shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 "
                  style={{ opacity: "0" }}
                  ref={inputFileRef}
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      setAvatar(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className=" px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
