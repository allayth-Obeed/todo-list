import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Divider, Container } from '@mui/material';
import './TodoList.css';
import Todo from './Todo.jsx'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from '../context/todosContext.js';
import {useContext} from "react";





const TodoList = () => {
  const {todos,setTodos}= useContext(TodosContext);
  const [titleInput, setTitleInput]= useState("");
  const [detailsInput, setDetails] = useState("");
  const todosjsx = todos.map((t)=>{
    return <Todo key={t.id} todo={t}/>
  })
  function handleAddClick(){
    const newTodo = {
      id:uuidv4(),
      title:titleInput,
      details:detailsInput,
      isCompleted:false
    }
    setTodos([...todos,newTodo])
    setTitleInput("")
  }
  return (
    <Container maxWidth="md">
  <Card>
    <CardContent>
      <Typography variant="h2" style={{textAlign:"center"}}>My Todo List</Typography>
      <Divider style={{border:"2px solid yellowgreen",borderRadius:"2px" }} />
      <div className="button-group">
        <button className="toggle-btn">All</button>
        <button className="toggle-btn">Completed</button>
        <button className="toggle-btn">Active</button>
      </div>
      {todosjsx}
      <div
        style={{ display:"grid",
          gridTemplateColumns:"1fr 2fr 2fr",
          gap:"10px",
          alignItems:"center"
          }}
          >
        <Button variant="contained"
        onClick={()=>{
          handleAddClick();
        }}
        style={{
          background:"green",
          marginTop:"8px",
          height:"80%"
        }}
        >Add</Button>
        <TextField id="outlined-basic" label="Add Task" 
        value={titleInput}
        onChange={(e)=>{
          setTitleInput(e.target.value)
        }} variant="outlined" />
        <TextField id="outlined-basic" label="Add details" 
        value={detailsInput}
        onChange={(e)=>{
          setDetails(e.target.value)
        }} variant="outlined" />
      </div>
    </CardContent>

    <CardActions>
      
    </CardActions>
  </Card>
</Container>

  )
}

export default TodoList
