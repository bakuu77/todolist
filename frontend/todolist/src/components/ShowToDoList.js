import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditTaskDialog from './EditTaskDialog';
import { fetchToDoList, addToDo } from '../Api';

const ToDoList = () => {
  const [todoList, setToDoList] = useState([]);

  const fetchData = async () => {
    const data = await fetchToDoList();
    setToDoList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToDo = async (newToDo) => {
    try {
      const addedToDo = await addToDo(newToDo);
      if (addedToDo) {
        setToDoList([...todoList, addedToDo]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

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
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={todoList} columns={columns} pageSize={5} />
    </div>
  );
};

export default ToDoList;