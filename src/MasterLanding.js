import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MasterLanding() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const name = params.get("name");
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const accessTokenObj = localStorage.getItem("token");
    if (!accessTokenObj) {
      navigate("/");
    }
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:4000/students?id=${id}`);
      setStudents(result.data);
    };
    fetchData();
  }, []);

  function assignTask(studentId) {
    axios.post("http://localhost:4000/assignTask", {
      masterId: id,
      studentId,
    });
  }

  const getResults = async (studentId, name) => {
    setSelectedStudentName(name);
    try {
      const response = await axios.get(
        `http://localhost:4000/tasks?studentId=${studentId}`
      );
      if (response) {
        setTasks(response.data);
      }
    } catch (error) {
      
    }
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
      <h2>Student List</h2>
      {students.map((student, index) => (
        <div key={index}>
          <p>
            {student.name}
            <button onClick={() => assignTask(student.id)}>Assign Task</button>
            <button onClick={() => getResults(student.id, student.name)}>
              View Results
            </button>
          </p>
        </div>
      ))}
      {tasks && tasks.length > 0 && (
        <div>
          <h2>{selectedStudentName}'s Results</h2>
          {tasks.map((task, index) => (
            <div key={index}>
              {task.answer ? (
                <div>
                  <label>Task</label>
                  <label> {task.id} </label>
                  <label> Expression: </label>
                  <label>{task.expression}</label>
                  <label style={{ marginLeft: "10px" }}>=</label>
                  <label style={{ marginLeft: "10px" }}></label>
                  <label>{task.answer}</label>
                </div>
              ) : (
                <div>
                  <label>Task</label>
                  <label> {task.id} </label>
                  <label> In progress </label>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MasterLanding;
