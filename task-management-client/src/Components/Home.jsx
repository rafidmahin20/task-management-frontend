import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';



const Home = ({isVerified, tasks, setTasks}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState("");

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
      withCredentials: true,
    }).then((res) => {
      toast.success((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
    }).catch((error) => {
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
        <div className="col text-end">
          <Button variant='primary' onClick={handleCreateModalShow}>Create Task</Button>
        </div>
      </div>
      <div className='row'>
        {
          tasks && tasks.length > 0 ? (tasks.map(task => {
            return(
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
                <Card style={{marginBottom: "20px", minHeight: "400px"}}>
                    
                </Card>
              </div>
            )
          })) : <h1>You dont have any tasks</h1>
        }
      </div>
    </div>
  )
}

export default Home