import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import {MdDelete, MdEdit} from 'react-icons/md';
import {FaEye} from 'react-icons/fa';
import CreateTaskModal from '../Components/CreateTaskModal.jsx';
import UpdateTaskModal from '../Components/UpdateTaskModal.jsx';
import ViewTaskModal from '../Components/ViewTaskModal.jsx';



const Home = ({isVerified, tasks, setTasks, taskType}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState("");

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if(!isVerified) {
    return <Navigate to={"/login"}/>
  }
  return (
    <div className="container my-4">
      <div className="row mb-3">
        <h1 style={{width: "fit-content"}}>{taskType}</h1>
        <div className="col text-end" style={{width: "fit-content"}}>
          <Button variant='primary' onClick={handleCreateModalShow}>Create Task</Button>
        </div>
      </div>
      <div className='row'>
        {
          tasks && tasks.length > 0 ? (tasks.map(task => {
            return(
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
                <Card style={{marginBottom: "20px", minHeight: "400px"}}>
                    <Card.Body className="d-flex justify-content-between flex-column">
                      <Stack gap={2}>
                        <Card.Title className="mb-2" style={{height: "50px"}}>
                          {
                            task && task.title.length <= 40 ? task.title : task.title.slice(0,40) + "..."
                          }
                        </Card.Title>
                        <Card.Text>
                        {
                            task && task.title.description <= 200 ? task.description : task.description.slice(0,200) + "..."
                        }
                        </Card.Text>
                      </Stack>
                      <Stack direction='horizontal' gap={2} className="justify-content-end">
                        <MdEdit className="fs-3" onClick={() => handleUpdateModalShow(task._id)}/>
                        <MdDelete className="fs-3" onClick={() => deleteTask(task._id)}/>
                        <FaEye className="fs-3" onClick={() => handleViewModalShow(task._id)}/>
                      </Stack>
                    </Card.Body>
                </Card>
              </div>
            )
          })) : <h1>You dont have any {taskType}</h1>
        }
      </div>
        <CreateTaskModal 
        handleCreateModalClose={handleCreateModalClose} showCreateModal={showCreateModal} setTasks={setTasks}/>

        <UpdateTaskModal handleUpdateModalShow={handleUpdateModalShow} handleUpdateModalClose={handleUpdateModalClose} id={updateTaskId} setTasks={setTasks} showUpdateModal={showUpdateModal}/>

        <ViewTaskModal showViewModal={showViewModal} handleViewModalClose={handleViewModalClose} id={viewTaskId}/>
    </div>
  )
}

export default Home