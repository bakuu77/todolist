import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import { addToDo } from '../Api';

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

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newToDo = await addToDo({ title, done, done_date: done ? new Date().toISOString() : null });
      console.log("Hejo")
      if (newToDo && typeof onAdd === 'function') {
        onAdd(newToDo);
        setTitle('');
        setDone(false);
        setDoneDate('');
        console.log('zamykam')
        handleClose();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Dodaj zadanie
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj nowe zadanie</DialogTitle>
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
              label="Zadanie zrobione"
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
              <Button onClick={handleClose}>Anuluj</Button>
              <Button type="submit" variant="contained" color="primary">Dodaj</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
