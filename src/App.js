import React from "react";
import TodoList from "./components/TodoList.jsx";
import { TodosContext } from "./context/todosContext.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MySnackBar from './components/MySnackBar.js';

const initial = [
  {
    id: uuidv4(),
    title: "reading a book",
    details: "dont forget reading",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading a book",
    details: "dont forget reading",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading a book",
    details: "dont forget reading",
    isCompleted: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette:{
    primary:{
      main:"#dd2c00",
    }
  }
});
function App() {
  const [todos, setTodos] = useState(initial);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "20px" }}>
        <MySnackBar />
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
