import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditTaskDialog = ({ task, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.put(`/todolist/${task.id}`, editedTask);
      onUpdate(editedTask);
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Done"
              name="done"
              type="checkbox"
              checked={editedTask.done}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTaskDialog;