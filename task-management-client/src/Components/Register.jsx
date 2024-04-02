import axios from 'axios';
import { useState } from 'react'
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';




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
    <Container className="d-flex justify-content-center align-content-center" style={{minHeight: "800px"}}>jhg</Container>
  )
}

export default Register