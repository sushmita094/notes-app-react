import React, { Component } from "react";

import TaskCard from "./components/TaskCard";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      inputVal: "",
      editInputVal: "",
    };
  }

  componentDidMount() {
    let taskListLocal = localStorage.getItem("taskListLocal");
    if (taskListLocal !== null) {
      taskListLocal = JSON.parse(taskListLocal);
      console.log(taskListLocal, typeof taskListLocal);
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

  handleAddTask = (e) => {
    e.preventDefault();
    let taskArr = this.state.taskList;
    let taskName = this.state.inputVal;
    if (taskName.trim()) {
      taskArr.push(taskName);
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

  updateLocalStorage = () => {
    localStorage.setItem("taskListLocal", JSON.stringify(this.state.taskList));
  };

  onChangeEditInput = (event) => {
    this.setState({
      editInputVal: event.target.value,
    });
  };

  onFinishEditTask = (editIndex) => {
    let taskArr = this.state.taskList;
    taskArr.splice(editIndex, 1, this.state.editInputVal);
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

  render() {
    return (
      <div className="page-wrapper">
        <form className="add-task-form">
          <input
            value={this.state.inputVal}
            onChange={(e) => this.onInputChange(e)}
            type="text"
            placeholder="Add"
          />
          <button
            className="button"
            type="button"
            onClick={(e) => this.handleAddTask(e)}
          >
            Add a Task
          </button>
        </form>

        <div className="tasks-grid">
          {this.state.taskList.map((task, index) => (
            <TaskCard
              task={task}
              index={index}
              editInputVal={this.state.editInputVal}
              handleDeleteTask={this.onDeleteTask}
              handleChangeEditInput={this.onChangeEditInput}
              handleFinishEditTask={this.onFinishEditTask}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
