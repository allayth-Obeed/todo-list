import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import "./Todo.css";
import { useContext } from "react";
import { TodosContext } from "../context/todosContext.js";

const Todo = ({ todo, showDelete, showEdit }) => {
  const { todos, setTodos } = useContext(TodosContext);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteDialog() {
    showDelete(todo);
  }

  function handleEditOpen() {
    showEdit(todo);
  }

  return (
    <>
      <Card className="task">
        <CardContent>
          <div className="grid_task">
            <div>
              <Typography
                variant="h4"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
              >
                {todo.details}
              </Typography>
            </div>

            <div className="togglebtn">
              <FaCheck
                className="btn"
                style={{
                  border: todo.isCompleted ? "white solid 2px" : "blue solid 2px",
                  color: todo.isCompleted ? "white" : "blue",
                  background: todo.isCompleted ? "green" : "white",
                }}
                onClick={handleCheckClick}
              />

              <FaEdit className="btn" color="blue" onClick={handleEditOpen} />

              <FaTrash className="btn" color="red" onClick={handleDeleteDialog} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
