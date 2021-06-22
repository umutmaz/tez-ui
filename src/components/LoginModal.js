import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState, useEffect } from "react";
import { http } from '../http'
import SignupModal from "./SignupModal"
import { useHistory } from "react-router-dom";


function LoginModal() {
    const history = useHistory();
    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showModal, setShowModal] = useState(true);


    //the functions that will request api, then redirect to home


    const handleClose = () => setShowModal(false);
    const handleSignUpClick = () => {
        history.push("/signup")
    }
  
    const handleSubmit = (e)=>{
        const data = {
            username,
            password
        }
        http.post("/auth/login",data).then((res)=>{
            if(res.data.data){
                localStorage.setItem("user", JSON.stringify(res.data.data))
                history.push("/home")
            }            
        })
    }
  
    return (
        <Modal show={true} >
        <Modal.Header >
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <div className="pb-4">

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} />
            </Form.Group>
            </div>

            <Form.Group controlId="formBasicPassword" className="pb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
        <div className="row mx-1">
        <Button className="pr-3" variant="primary" type="button" onClick={(e)=>handleSubmit(e)}>
            Login
        </Button>
        </div>

        </Form>
        </Modal.Body>
        <Modal.Footer>
 
            <Button className="pr-3" variant="secondary" type="button" onClick={()=>handleSignUpClick()}>           <div>
                Not registered?
            </div></Button>
        </Modal.Footer>
        </Modal>
)
}

export default LoginModal;
           
