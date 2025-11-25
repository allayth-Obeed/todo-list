import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import "./Todo.css";
import { useContext, useState } from "react";
import { TodosContext } from "../context/todosContext.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Todo = ({ todo }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editTodo,setEditTodo]= useState({title:todo.title,details:todo.details})
  const { todos, setTodos } = useContext(TodosContext);
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
  }
  function handleDeleteDialog() {
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleEditClose() {
    setShowEditDialog(!showEditDialog);
  }
  function handleDeleteConfirm(){
    
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
  }
  function handleEditConfirm(){
    
    const updatedTodos = todos.map((t) => {
      if(t.id== todo.id){
        return {...t,title:editTodo.title,details:editTodo.details}
      }else{
        return t
      }
    });
    setTodos(updatedTodos);
    setShowEditDialog(false);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
  }
  return (
    <>
    {/* Delete Dialog */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You well remove task , are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          con`t undo from this choise.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={handleDeleteDialogClose}
          >No , Close</Button>
          <Button 
          onClick={handleDeleteConfirm}
          autoFocus>Yes , Remove it</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog
        onClose={handleEditClose}
        open={showEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You well remove task , are you sure?"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Title"
            value={editTodo.title}
            onChange={(e)=>{
              setEditTodo({...editTodo,title:e.target.value});
            }}
            type="text"
            fullWidth
            />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Details"
            value={editTodo.details}
            onChange={(e)=>{
              setEditTodo({...editTodo,details:e.target.value});
            }}
            type="text"
            fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button
          onClick={handleEditClose}
          >No , Close</Button>
          <Button 
          onClick={handleEditConfirm}
          autoFocus>Confirm it</Button>
        </DialogActions>
      </Dialog>
      <Card className="task">
        <CardContent>
          <div className="grid_task">
            <div>
              <Typography variant="h4">{todo.title}</Typography>
              <Typography variant="h5">{todo.details}</Typography>
            </div>
            <div className="togglebtn">
              <FaCheck
                className="btn"
                style={{
                  border: todo.isCompleted
                    ? "white solid 2px"
                    : "blue solid 2px",
                  color: todo.isCompleted ? "white" : "blue",
                  background: todo.isCompleted ? "green" : "white",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
                color="green"
              />
              <FaEdit className="btn" color="blue"
              onClick={handleEditClose}
              />
              <FaTrash
                className="btn"
                color="red"
                onClick={handleDeleteDialog}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
