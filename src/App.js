import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      inputVal: "",
      editInputVal: "",
      editMode: false,
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

    localStorage.setItem("taskListLocal", JSON.stringify(this.state.taskList));
  };

  onEditTask = (editIndex) => {
    this.setState({
      editMode: true,
    });
  };

  onDeleteTask = (deleteIndex) => {
    let taskArr = this.state.taskList;
    taskArr = taskArr.filter((task, index) => index !== deleteIndex);
    this.setState({
      taskList: taskArr,
    });
  };

  onChangeEditInput = (event) => {
    this.setState({
      editInputVal: event.target.value,
    });
  };

  onFinishEditTask = (event, editIndex) => {
    event.preventDefault();
    let taskArr = this.state.taskList;
    console.log("taskarr before", taskArr);
    taskArr.splice(editIndex, 1, this.state.editInputVal);
    console.log("taskarr after", taskArr);
    this.setState({
      taskList: taskArr,
      editMode: false,
      editInputVal: "",
    });
  };

  render() {
    return (
      <div className="App">
        <form>
          <input
            value={this.state.inputVal}
            onChange={(e) => this.onInputChange(e)}
            type="text"
            placeholder="Add"
          />
          <button type="submit" onClick={(e) => this.handleAddTask(e)}>
            Add a Task
          </button>
        </form>

        {this.state.taskList.map((task, index) => (
          <div className="taskCard" key={index}>
            {this.state.editMode === false ? (
              <>
                <p>{task}</p>
                <button onClick={() => this.onEditTask()}>Edit</button>
                <button onClick={() => this.onDeleteTask(index)}>Delete</button>
              </>
            ) : (
              <form>
                <input
                  placeholder="Edit"
                  value={this.state.editInputVal}
                  onChange={(e) => this.onChangeEditInput(e)}
                />
                <button
                  type="submit"
                  onClick={(e) => this.onFinishEditTask(e, index)}
                >
                  Save
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
