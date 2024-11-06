import { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; 

export default function Register() {
    
    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") 
           && (mobileNo.length === 11) && (password === confirmPassword)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    function registerUser(e) {
    e.preventDefault();

    // Prepare the user data to send
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password
    };

    // Simulate sending data to a backend API 

    fetch(`${process.env.REACT_APP_API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful registration, e.g., redirect or show success message
            console.log("User registered successfully", data);
        } else {
            // Handle errors
            console.error("Registration failed", data.message);
        }
    })
    .catch(error => {
        console.error("Error during registration:", error);
    });
}

    if (user.id !== null) {
        return <Navigate to="/products" />;
    }

    return (
        <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Register</h1>

            <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" required value={firstName} onChange={e => {setFirstName(e.target.value)}} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" required value={lastName} onChange={e => {setLastName(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" required value={email} onChange={e => {setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control type="text" placeholder="Enter 11 Digit No." required value={mobileNo} onChange={e => {setMobileNo(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" required value={password} onChange={e => {setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}/>
            </Form.Group>
        
            {   
        
                isActive ? 
                
                    <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
    
                :
        
                    <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
            }
        </Form>
    );
}

