import React, { Component } from "react";

import TaskCard from "./components/TaskCard";

import "./App.css";

class App extends Component {
  state = {
    taskList: [],
    inputVal: "",
    editInputVal: "",
  };

  componentDidMount() {
    let taskListLocal = localStorage.getItem("taskListLocal");
    if (taskListLocal !== null) {
      taskListLocal = JSON.parse(taskListLocal);
      this.setState({
        taskList: taskListLocal,
      });
    }
  }

  onInputChange = (event) => {
    this.setState({
      inputVal: event.target.value,
    });
  };

  handleAddTask = () => {
    console.log("task add func called");
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
    console.log("edit started", editIndex);
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

  render() {
    const { inputVal, editInputVal, taskList } = this.state;

    return (
      <div className="page-wrapper">
        <div className="time-container">
          <span className="day">FRIDAY</span>
          <span className="date">21st Nov 2020</span>
        </div>

        <form className="add-task-form" onSubmit={this.handleAddTask}>
          <input
            className="input"
            value={inputVal}
            onChange={(e) => this.onInputChange(e)}
            type="text"
            placeholder="Add"
          />
          <button
            type="button"
            className="button"
            onClick={() => this.handleAddTask()}
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
    );
  }
}

export default App;
