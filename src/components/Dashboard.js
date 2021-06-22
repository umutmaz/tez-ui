

import React from 'react'
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal"
import SignupModal from "./SignupModal"
function Dashboard() {


    return (
        <div>

           <LoginModal />
           {/* <SignupModal showModal={showSignUpModal} setShowModal={setShowSignUpModal} setUserName={setUserName}/> */}
        </div>
    )
}

export default Dashboard
