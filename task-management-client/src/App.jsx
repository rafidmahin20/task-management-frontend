import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Header from './Components/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [taskTitle, setTaskTitle] = useState("Tasks");

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const {data} = await axios.get(
          "http://localhost:4000/api/v1/user/profile",
          {withCredentials: true}
        );
        setIsVerified(true);
        setUser(data.user);
      } catch (error) {
        console.log("User is not verified");
        setIsVerified(false);
        setUser({});
      }
    };
    handleGetUser();
  }, [isVerified]);
  return (
    <div>
      <Router>
        <Header 
        setTasks={setTasks}
        setIsVerified={setIsVerified}
        isVerified={isVerified}
        setTaskTitle={setTaskTitle}
        />
        <Routes>
          <Route path='/' element={<Home 
          isVerified={isVerified}
          tasks={tasks}
          setTasks={setTasks}
          />}/>

          <Route path='/login' element={<Login 
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          />}/>

          <Route path='/register' element={<Register 
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          />}/>

          <Route path='/profile' element={<Profile 
          user={user}
          isVerified={isVerified}
          />}/>
        </Routes>
        <Toaster/>
      </Router>
    </div>
  )
}

export default App