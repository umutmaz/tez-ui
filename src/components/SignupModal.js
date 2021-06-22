import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import {http} from "../http"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function SignupModal() {
    const history = useHistory();
    const [name, setName] = useState();
    const [showModal, setShowModal] = useState(true)
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
  
    const handleClose = () => setShowModal(false);

    const handleLoginClick = () => {
        history.push("/")
    }
  
    const handleSubmit = (e)=>{
        const data = {
            name,
            surname,
            email,
            username,
            password
        }
        http.post("/auth/register",data).then((response)=>{
            console.log(response)
            handleClose();
            history.push("/")
        })
    }
  
    return (
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Signup Form</Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <Form id="signupForm">
            <Form.Group controlId="formBasicName" className="pb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicSurname" className="pb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter Surname" onChange={(e)=>setSurname(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="pb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicUsername" className="pb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="pb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
        <div className="row mx-1">
        <Button className="pr-3" variant="primary" form="signupForm" type="button" onClick={handleSubmit}>
            Sign Up
        </Button>
        </div>

        </Form>
        </Modal.Body>
        <Modal.Footer>
 
 <Button className="pr-3" variant="secondary" type="button" onClick={()=>handleLoginClick()}>           <div>
     Already registered?
 </div></Button>
</Modal.Footer>
        </Modal>
)
}

export default SignupModal
