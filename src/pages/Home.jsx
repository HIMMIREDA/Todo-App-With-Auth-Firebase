import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
      
        
      <main className="container mx-auto px-3 pb-12 w-screen">
        <Outlet />
      </main>
        
    </>
  )
}

export default Home;
