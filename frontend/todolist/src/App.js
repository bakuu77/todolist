import React from 'react';
import AddTask from './components/AddTask';
import ToDoList from './components/ShowToDoList';

function App() {
  return (
    <div className="App">
      <AddTask onAdd={handleAddToDo}/>
      <ToDoList />
    </div>
  );
}

export default App;