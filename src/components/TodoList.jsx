import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Divider, Container } from '@mui/material';
import './TodoList.css';
import Todo from './Todo.jsx'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from '../context/todosContext.js';
import {useContext , useEffect} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';





const TodoList = () => {
  const {todos,setTodos}= useContext(TodosContext);
  const [displayedTodosType , setDisplayedTodosType]= useState("all");
  const [titleInput, setTitleInput]= useState("");
  const [detailsInput, setDetails] = useState("");
  const completedTodos = todos.filter((t)=>{
    return t.isCompleted;
  });
  const notCompletedTodos = todos.filter((t)=>{
    return !t.isCompleted;
  });
  let todosToBeRendered = todos
  if(displayedTodosType=="completed"){
    todosToBeRendered = completedTodos
  }else if(displayedTodosType=="active"){
    todosToBeRendered = notCompletedTodos;
  }else {
    todosToBeRendered = todos
  }
  const todosjsx = todosToBeRendered.map((t)=>{
    return <Todo key={t.id} todo={t}/>
  });
  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem("todos"))
    setTodos(storageTodos);
  },[]);
  function changeDisplayedType(e){
    setDisplayedTodosType(e.target.value);
  }
  function handleAddClick(){
    const newTodo = {
      id:uuidv4(),
      title:titleInput,
      details:detailsInput,
      isCompleted:false
    }
    const updatedTodos = [...todos,newTodo]
    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  
  return (
    <Container maxWidth="md">
  <Card sx={{minWidth:275}} style={{
    maxHeight:"80vh",
    overflow:"scroll"
  }}>
    <CardContent>
      <Typography variant="h2" style={{textAlign:"center"}}>My Todo List</Typography>
      <Divider style={{border:"2px solid yellowgreen",borderRadius:"2px" }} />
          <ToggleButtonGroup
    sx={{
      display:"flex",
      justifyContent:"center"
    }}
    color="primary"
    value={displayedTodosType}
    onChange={changeDisplayedType}
    exclusive
    aria-label="todo filter"
  >
    <ToggleButton value="all">
      All
    </ToggleButton>
    <ToggleButton value="completed">
      Completed
    </ToggleButton>
    <ToggleButton value="active">
      Active
    </ToggleButton>
  </ToggleButtonGroup>


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
        disabled={titleInput.length==0 || detailsInput.length==0}
        style={{
          background:"primary",
          marginTop:"8px",
          height:"80%",
          
        }}
        >Add</Button>
        <TextField id="outlined-basic" label="Add Task" 
        value={titleInput}
        onChange={(e)=>{
          setTitleInput(e.target.value)
        }} variant="outlined" />
        <TextField label="Add details" 
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
