import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditTaskDialog from './EditTaskDialog';
import { addTask, deleteTask, fetchToDoList } from '../Api';
import { Button } from '@mui/material';
import AddTask from './AddTask';

const ToDoList = () => {
  const [todoList, setToDoList] = useState([]);

  const fetchData = async () => {
    const data = await fetchToDoList();
    setToDoList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idToDelete) => {
    try {
      await deleteTask(idToDelete);
      fetchData();
    } catch(error) {
      console.error('Error deleting task: ', error);
    }
  }

  const handleAddTask = async (newTask) => {
    try {
      await addTask(newTask);
      fetchData();
    } catch (error) {
      console.error('Error adding task: ', error)
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'done', headerName: 'Done', width: 200 },
    { field: 'author_ip', headerName: 'Author\'s IP', width: 200 },
    { field: 'created_date', headerName: 'Created Date', width: 200 },
    { field: 'done_date', headerName: 'Done Date', width: 200 },
    { 
      field: 'edit', headerName: 'Edit', width: 100,
      renderCell: params => <EditTaskDialog task={params.row} onUpdate={() => fetchData()} /> 
    },
    {
      field: 'delete', headerName: 'Delete', width: 100,
      renderCell: params => (
        <Button
          variant='outlined'
          color='error'
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <>
      <div style={{ height: 600, width: '100%', marginBottom: '20px' }}>
        <div style={{ width: '40%', textAlign: 'center', margin: 'Auto', marginTop: '30px', marginBottom: '30px'}}>
          <AddTask onAdd={handleAddTask} />
        </div>
        <div style={{ height:500 }}>
          <DataGrid rows={todoList} columns={columns} pageSize={5} hideFooter={true}/>
        </div>
      </div>
    </>
  );
};

export default ToDoList;