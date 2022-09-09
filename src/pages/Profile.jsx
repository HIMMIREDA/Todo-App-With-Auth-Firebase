import { useRef } from "react";

function Profile() {
  
  const inputFileRef = useRef();
  const handleClickChangePic = () => {
    inputFileRef.current.click();
  }
  return (
      
        
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            <form >
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6  px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium">
                        Email
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          id="email"
                          className="input"
                          placeholder="Email"
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
                          type="text"
                          id="password"
                          className="input"
                          placeholder="Password"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full ">
                        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border  py-2 px-3 text-sm font-medium leading-4  shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
                        onClick={handleClickChangePic}
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium ">Cover photo</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed  px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 "
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm ">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 "
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={inputFileRef} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 bg-primary text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        
  );
}

export default Profile