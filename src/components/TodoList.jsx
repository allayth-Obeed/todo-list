import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import "./TodoList.css";
import Todo from "./Todo.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../context/todosContext.js";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [dialogTodo, setDialogTodo] = useState(null);

  const [editTodo, setEditTodo] = useState({
    title: "",
    details: "",
  });

  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");

  const completedTodos = todos.filter((t) => t.isCompleted);
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  let todosToBeRendered =
    displayedTodosType === "completed"
      ? completedTodos
      : displayedTodosType === "active"
      ? notCompletedTodos
      : todos;

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTitleInput("");
    setDetailsInput("");
  }
  
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function openEditDialog(todo) {
    setDialogTodo(todo);
    setEditTodo({
      title: todo.title,
      details: todo.details,
    });
    setShowEditDialog(true);
  }

  function handleEditConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return {
          ...t,
          title: editTodo.title,
          details: editTodo.details,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditDialog(false);
  }

  const todosjsx = todosToBeRendered.map((t) => (
    <Todo key={t.id} todo={t} showDelete={openDeleteDialog} showEdit={openEditDialog} />
  ));

  return (
    <>
      {/* Delete Dialog */}
      <Dialog onClose={handleDeleteDialogClose} open={showDeleteDialog}>
        <DialogTitle>هل أنت متأكد من حذف المهمة؟</DialogTitle>
        <DialogContent>
          <DialogContentText>لا يمكن التراجع عن هذا الإجراء.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم، احذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="العنوان"
            fullWidth
            value={editTodo.title}
            onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
          />

          <TextField
            margin="dense"
            label="التفاصيل"
            fullWidth
            value={editTodo.details}
            onChange={(e) => setEditTodo({ ...editTodo, details: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>إغلاق</Button>
          <Button onClick={handleEditConfirm} autoFocus>
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>

      {/* START Todo List */}
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275 }} style={{ maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            <Typography variant="h2" align="center">
              My Todo List
            </Typography>

            <Divider style={{ border: "2px solid yellowgreen", borderRadius: "2px" }} />

            <ToggleButtonGroup
              color="primary"
              value={displayedTodosType}
              onChange={changeDisplayedType}
              exclusive
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="active">Active</ToggleButton>
            </ToggleButtonGroup>

            {todosjsx}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 2fr",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleAddClick}
                disabled={titleInput.length === 0 || detailsInput.length === 0}
              >
                Add
              </Button>

              <TextField
                label="Add Task"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />

              <TextField
                label="Add Details"
                value={detailsInput}
                onChange={(e) => setDetailsInput(e.target.value)}
              />
            </div>
          </CardContent>

          <CardActions></CardActions>
        </Card>
      </Container>
    </>
  );
};

export default TodoList;
