import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentLanding() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const name = params.get("name");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const accessTokenObj = localStorage.getItem("token");

    if (!accessTokenObj) {
      navigate("/");
    }

    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:4000/tasks?studentId=${id}`
      );
      setTasks(result.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event, taskId) => {
    event.preventDefault();
    const expression = event.target.elements.expression.value;
    try {
      const response = await axios.post("http://localhost:4000/calculate", {
        expression,
        taskId,
      });
      if (response.data) {
        const fetchData = async () => {
          const result = await axios.get(`http://localhost:4000/tasks?studentId=${id}`);
          setTasks(result.data);
        };
        fetchData();
      }
    } catch (error) {}
  };

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <div>
      <div style={{ float: "right" }}>
        <label>Hi {name}</label>
        <a style={{ marginLeft: "10px" }} href="#" onClick={logout}>
          Logout
        </a>
      </div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <br />
            {task.answer ? (
              <div>
                <label> Expression: </label>
                <label>{task.expression}</label>
                <label style={{ marginLeft: "10px" }}>=</label>
                <label style={{ marginLeft: "10px" }}></label>
                <label>{task.answer}</label>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, task.id)}>
                <label>
                  Expression:
                  <input type="text" name="expression" />
                </label>
                <button type="submit">Calc</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentLanding;
