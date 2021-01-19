import React, { Component } from "react";

import TaskCard from "./components/TaskCard";

import sun from "./assets/sun.svg";
import moon from "./assets/moon.svg";

import "./App.css";

class App extends Component {
  state = {
    taskList: [],
    inputVal: "",
    editInputVal: "",
    isDarkMode: false,
  };

  componentDidMount() {
    let taskListLocal = localStorage.getItem("taskListLocal");
    if (taskListLocal !== null) {
      taskListLocal = JSON.parse(taskListLocal);
      this.setState({
        taskList: taskListLocal,
      });
    }

    let userMode = localStorage.getItem("userMode");
    if (userMode === "dark") {
      this.setState({
        isDarkMode: true,
      });
    }
  }

  onInputChange = (event) => {
    this.setState({
      inputVal: event.target.value,
    });
  };

  handleAddTask = (e) => {
    e.preventDefault();
    let taskArr = this.state.taskList;
    let taskName = this.state.inputVal;
    let newTask = {
      name: this.state.inputVal,
      completed: false,
    };
    if (taskName.trim()) {
      taskArr.push(newTask);
    }
    this.setState({
      taskList: taskArr,
      inputVal: "",
    });

    this.updateLocalStorage();
  };

  onDeleteTask = (deleteIndex) => {
    let taskArr = this.state.taskList;
    taskArr = taskArr.filter((task, index) => index !== deleteIndex);
    this.setState(
      {
        taskList: taskArr,
      },
      () => {
        this.updateLocalStorage();
      }
    );
  };

  onEditTask = (editIndex) => {
    this.setState({
      editInputVal: this.state.taskList[editIndex].name,
    });
  };

  onChangeEditInput = (event) => {
    this.setState({
      editInputVal: event.target.value,
    });
  };

  onFinishEditTask = (editIndex) => {
    let taskArr = this.state.taskList;
    let task = taskArr[editIndex];
    task.name = this.state.editInputVal;
    this.setState(
      {
        taskList: taskArr,
        editInputVal: "",
      },
      () => {
        this.updateLocalStorage();
      }
    );
  };

  onMarkComplete = (index) => {
    let taskArr = this.state.taskList;
    let task = taskArr[index];
    task.completed = !task.completed;
    this.setState(
      {
        taskList: taskArr,
      },
      () => {
        this.updateLocalStorage();
      }
    );
  };

  updateLocalStorage = () => {
    localStorage.setItem("taskListLocal", JSON.stringify(this.state.taskList));
  };

  toggleDarkMode = () => {
    this.setState(
      (prevState) => ({
        isDarkMode: !prevState.isDarkMode,
      }),
      () => {
        if (this.state.isDarkMode) {
          localStorage.setItem("userMode", "dark");
        } else {
          localStorage.setItem("userMode", "light");
        }
      }
    );
  };

  render() {
    const { inputVal, editInputVal, taskList, isDarkMode } = this.state;

    return (
      <div className={`page-wrapper ${isDarkMode && "dark"}`}>
        <div className="container">
          <div className="header">
            <h1 className="heading">Taskify</h1>
            <button
              className="dark-mode-switch"
              onClick={() => this.toggleDarkMode()}
            >
              {/* Switch to {isDarkMode ? "Light" : "Dark"} Mode */}
              <img src={sun} className="sun" alt="toggle for dark/light mode" />
              <img
                src={moon}
                className="moon"
                alt="toggle for dark/light mode"
              />
              <span
                className={`indicator ${isDarkMode && "indicator-right"}`}
              ></span>
            </button>
          </div>

          <form
            className="add-task-form"
            onSubmit={(e) => this.handleAddTask(e)}
          >
            <input
              className="input"
              value={inputVal}
              onChange={(e) => this.onInputChange(e)}
              type="text"
              placeholder="Add"
            />
            <button
              type="button"
              className="button primary-button"
              onClick={(e) => this.handleAddTask(e)}
            >
              Add a Task
            </button>
          </form>

          <div className="tasks-grid">
            {taskList.map((task, index) => (
              <TaskCard
                task={task}
                index={index}
                editInputVal={editInputVal}
                handleEditTask={this.onEditTask}
                handleDeleteTask={this.onDeleteTask}
                handleChangeEditInput={this.onChangeEditInput}
                handleFinishEditTask={this.onFinishEditTask}
                handleMarkComplete={this.onMarkComplete}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
