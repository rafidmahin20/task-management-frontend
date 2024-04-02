import axios from 'axios';
import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';




const Register = ({isVerified, setIsVerified}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);

    await axios.post("http://localhost:4000/api/v1/user/register", formData, {
      withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    }).then((res) => {
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
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
      <Form onSubmit={handleRegister} className="w-100 p-5 mx-auto">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" onChange={avatarHandler}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Already Registered? <Link to={"/login"} className="text-decoration-none">Login</Link></Form.Label>
      </Form.Group>
      <Button variant="warning" type="submit" className="w-100 fw-bold fs-5 text-light">
        Register
      </Button>
    </Form>  
      
    </Container>
  )
}

export default Register