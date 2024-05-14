import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const API_URL = 'http://localhost:8000';

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
    const { name, value, checked } = event.target;
    let newValue = value;
    if (event.target.type ==='checkbox') {
      newValue = checked;
      if (checked) {
        const doneDate = new Date().toISOString();
      setEditedTask({ ...editedTask, [name]: newValue, done_date: doneDate });
      } else {
        setEditedTask({ ...editedTask, [name]: newValue, done_date: null });
      }
    } else {
      if (name === 'done' && !checked) {
        setEditedTask({ ...editedTask, [name]: newValue, done_date: null });
      } else {
        if (name === 'done_date' && editedTask.done) {
          newValue = new Date().toISOString();
        }
        setEditedTask({ ...editedTask, [name]: newValue });
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.put(`${API_URL}/todolist/${task.id}/`, editedTask);
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
            <FormControlLabel
              control={<Checkbox name="done" checked={editedTask.done} onChange={handleChange} />}
              label="Done"
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
        
      </Dialog>
    </div>
  );
};

export default EditTaskDialog;