import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';

const Login = ({isVerified, setIsVerified}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:4000/api/v1/user/login",
      {email, password},
      {withCredentials: true, headers: {"Content-Type": "application/json"},
    }
    ).then((res) => {
      setEmail("");
      setPassword("");
      setIsVerified(true);
      toast.success(res.data.message);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  if(isVerified) {
    return <Navigate to={"/"}/>
  }
  return (
    <Container className="d-flex justify-content-center align-content-center" style={{minHeight: "800px"}}>
      <Form onSubmit={handleLogin} className="w-100 p-5 mx-auto">

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Not Registered? <Link to={"/register"} className="text-decoration-none">Register</Link></Form.Label>
      </Form.Group>
      <Button variant="info" type="submit" className="w-100 fw-bold fs-5 text-light">
        LOGIN
      </Button>
    </Form>  
      
    </Container>
  )
}

export default Login