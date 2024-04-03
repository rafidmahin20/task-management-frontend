import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';



function Header({setTasks,  setIsVerified, isVerified, setTaskTitle, setTaskType}) {
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, [isVerified]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: "true" }
      );
      toast.success(data.message);
      setIsVerified(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskType("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskType("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskType("Archived Tasks");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskType("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isVerified ? "d-none" : ""}`}>
      <Container>
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className='text-decoration-none d-flex align-items-center link-light'>
              Home
              </Link>
              
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTasks("all")}>All Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>
                Complete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>Incomplete Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>
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