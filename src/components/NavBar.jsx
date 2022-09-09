import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { FaCheckCircle, FaUserNinja } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext/AuthContext";

function NavBar({ items }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content">
      <div className="flex-1 flex flex-row ">
        <FaCheckCircle color="#1FB2A6" size={40} />
        <Link to="/" className="btn btn-ghost normal-case text-xl ">
          TODONE
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            {
                currentUser?.photoURL ? (
                    <img src={currentUser?.photoURL} />
                )
                :(
                    <FaUserNinja color="white" className="rounded-full" size={40} />
                )
            }
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary"
          >
            {items.map(({ title, type, action }, index) => {
              if (type === "link") {
                return (
                  <li key={index}>
                    <Link to={action}>{title}</Link>
                  </li>
                );
              }
              if (type === "button") {
                return (
                  <li key={index}>
                    <button onClick={action}>{title}</button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  items: PropTypes.arrayOf(Object),
};

export default NavBar;
