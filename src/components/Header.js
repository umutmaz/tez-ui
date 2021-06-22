import React from "react";
import { useHistory } from "react-router-dom";


function Header() {
  const history = useHistory();
  const {user} = JSON.parse(localStorage.getItem("user"));
  const handleLogout = ()=>{
    localStorage.removeItem("user")
    history.push("/")
  }

  return (
    <div className="container-fluid header-bg ">
      <nav
        className=" navbar navbar-light justify-content-between "
        id="navbarHeader"
      >
        <h3>iFrpChain</h3>
        <div className="col-2 d-flex align-items-end justify-content-center">
          <div className="align-items-center flex-grow-1 text-center pb-1">
            @{user.username}
          </div>

          <button
            className="btn btn-outline-success my-2 my-sm-0 mx-3"
            type="button" onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
