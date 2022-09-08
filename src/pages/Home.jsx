import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";
import NavBar from "../components/NavBar";


function Home() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async ()=>{
    await logOut();
    navigate("/signin");
  }

  return (
    <>
      <div className="flex flex-col justify-between h-screen w-screen">

      <NavBar items={[
        {
          title: "Profile",
          type: "link",
          action: "/profile"
        },
        {
          title: "Logout",
          type: "button",
          action: handleClick
        }
      ]}/>
      </div>
        
      
        
    </>
  )
}

export default Home;
