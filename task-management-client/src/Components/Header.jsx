import axios from 'axios';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';



function Header({setTasks, tasks, setIsVerified, isVerified}) {
  const handleLogout = async () => {
    try {
      const {data} = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {withCredentials: true}
      );
      toast.success(data.message)
      setIsVerified(false);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className='text-decoration-none d-flex align-items-center link-light'>
              Home
              </Link>
              
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item >All Tasks</NavDropdown.Item>
              <NavDropdown.Item >
                Complete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item >Incomplete Tasks</NavDropdown.Item>
              <NavDropdown.Item >
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Link to={"/profile"} className='text-decoration-none d-flex align-items-center link-light'>
              My Profile
            </Link>  
            <Button
              className="bg-transparent border-0"
              style={{ width: "fit-content" }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;