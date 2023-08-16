import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "../styles/todo.css";

const Todo = () => {
  const [data, setData] = useState("");
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("todo")) || [];
  });
  const [editItem, setEditItem] = useState({});
  const [isInProgress, setIsInProgress] = useState(false);

  const addTodo = () => {
    if (data.length === 0) return;
    setData("");
    if (Object.keys(editItem).length > 0) {
      const updateVal = [...todo];
      updateVal.splice(editItem.index, 1, {
        item: data,
        isCompleted: editItem.complete,
      });
      setEditItem({});
      setData("");
      return setTodo(updateVal);
    }
    const obj = {};
    obj.isCompleted = false;
    obj.item = data;
    obj.id = todo.length;
    setTodo([...todo, obj]);
  };

  const todoList = !isInProgress
    ? todo
    : todo.filter((todoItem) => {
        return todoItem.isCompleted === false;
      });

  const deleteTodo = (index) => {
    const updateTodo = [...todo];
    updateTodo.splice(index, 1);
    setTodo(updateTodo);
  };

  const editTodo = (item, index, isComplete) => {
    setData(item);
    const obj = { index: index, complete: isComplete };
    setEditItem(obj);
  };

  const checkCompleteTask = (e, val, index) => {
    const check = e.target.checked;
    const checkedTodo = [...todo];
    if (check) {
      checkedTodo.splice(index, 1, { isCompleted: true, item: val, id: index });
      setTodo(checkedTodo);
    } else {
      checkedTodo.splice(index, 1, {
        isCompleted: false,
        item: val,
        id: index,
      });
      setTodo(checkedTodo);
    }
  };

  const allTodo = JSON.parse(localStorage.getItem("todo"));
  const hideandShow = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setIsInProgress(true);
    } else {
      setIsInProgress(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="mainWrapper">
      <div className="wrapper">
        <div className="todoContainer">
          <div className="todoHeading">
            <h2>Todo List </h2>
          </div>
          <div className="searchTodo">
            <input
              className="search"
              placeholder="Add Your Todo"
              type="text"
              size={40}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <button className="searchbtn" onClick={addTodo}>
              Add
            </button>
          </div>
          <div className="todoList">
            {todo &&
              todoList?.map((todos, index) => {
                return (
                  <div key={index} className="todoItem">
                    <div className="todo">
                      <Checkbox
                        checked={todos.isCompleted}
                        onClick={(e) =>
                          checkCompleteTask(e, todos.item, todos.id)
                        }
                        sx={{ color: "blue", fontSize: "20px" }}
                      />
                      {todos.item}
                    </div>

                    <div className="todoEdit">
                      <EditNoteRoundedIcon
                        onClick={() =>
                          editTodo(todos.item, index, todos.isCompleted)
                        }
                      />
                      <DeleteRoundedIcon onClick={() => deleteTodo(index)} />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="filterSection">
            <div>
              <Checkbox onClick={(e) => hideandShow(e)} />
              <button className="filterBtn">
                {isInProgress ? "Inprogress" : "All Task"}
              </button>
            </div>

            <div>
              Total Task: <strong>{allTodo?.length} </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
