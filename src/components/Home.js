import React from 'react'
import Header from "./Header";
import Content from "./Content";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
function Home() {
    const history = useHistory();
    const {user} = JSON.parse(localStorage.getItem('user'))
    if(!user || !user.username){
        history.push("/")
    }
    return (
    <>
        <Header/>
        <Content />
    </>
    )
}

export default Home
