import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';

const AddTask = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [done, setDone] = useState(false);
  const [doneDate, setDoneDate] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    try {
      const newToDo = { title, done, done_date: done ? new Date().toISOString() : null };
      if (newToDo) {
        onAdd(newToDo);
        setTitle('');
        setDone(false);
        setDoneDate('');
        handleClose();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <Button style={{width: '80%'}} variant="contained" color="primary" onClick={handleOpen}>
        Add task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Task</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit}>
            <TextField
              value={title}
              onChange={event => setTitle(event.target.value)}
              fullWidth
              required
            />
            <FormControlLabel
              control={<Checkbox checked={done} onChange={event => setDone(event.target.checked)} />}
              label="Task done"
            />
            {done && (
              <TextField
                type="date"
                value={doneDate}
                onChange={event => setDoneDate(event.target.value)}
                fullWidth
              />
            )}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
