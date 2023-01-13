// we will require the file
const jsonServer = require("json-server");
const middlewares = jsonServer.defaults();

const data = require("./data");

const server = jsonServer.create();

server.use(middlewares);
// parse the body using bodyParser middleware
server.use(jsonServer.bodyParser);

// obtain an instance of a server

server.post("/register", (req, res, next) => {
  const { name, email, password, role } = req.body;
  data.users.push({
    id: Math.floor(Math.random() * 10000),
    email: email,
    password: password,
    name: name,
    role: role,
  });
  res.send("Registered successfully");
  next();
});

server.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const user = data.users.find(
    (a) => a.email == email && a.password == password
  );
  const responseObj = user
    ? { token: Math.floor(Math.random() * 10000), user }
    : null;

  if (responseObj) {
    res.send(responseObj);
  } else {
    res.status(401);
    res.send({
      errorMsg: "unauthorized",
      code: 401,
    });
  }
  next();
});

server.get("/students", (req, res, next) => {
  res.send(data.users.filter((a) => a.role == "student"));
  next();
});

server.post("/assignTask", (req, res, next) => {
  const { masterId, studentId } = req.body;
  data.studentTasks.push({
    id: Math.floor(Math.random() * 10000),
    master_id: masterId,
    student_id: studentId
  });
  res.send("Task created Successfully");
  next();
});

server.get("/tasks", (req, res, next) => {
  const { studentId } = req.query;
  res.send(data.studentTasks.filter((a) => a.student_id == studentId));
  next();
});

function zero(operation) {
  return operation ? operation(0) : 0;
}
function one(operation) {
  return operation ? operation(1) : 1;
}
function two(operation) {
  return operation ? operation(2) : 2;
}
function three(operation) {
  return operation ? operation(3) : 3;
}
function four(operation) {
  return operation ? operation(4) : 4;
}
function five(operation) {
  return operation ? operation(5) : 5;
}
function six(operation) {
  return operation ? operation(6) : 6;
}
function seven(operation) {
  return operation ? operation(7) : 7;
}
function eight(operation) {
  return operation ? operation(8) : 8;
}
function nine(operation) {
  return operation ? operation(9) : 9;
}

function plus(rightOperand) {
  return function (leftOperand) {
    return leftOperand + rightOperand;
  };
}
function minus(rightOperand) {
  return function (leftOperand) {
    return leftOperand - rightOperand;
  };
}
function times(rightOperand) {
  return function (leftOperand) {
    return leftOperand * rightOperand;
  };
}
function divided_by(rightOperand) {
  return function (leftOperand) {
    return Math.floor(leftOperand / rightOperand);
  };
}

server.post("/calculate", (req, res, next) => {
  const { expression, taskId } = req.body;
  const result = eval(expression);
  const task = data.studentTasks.filter((a) => a.id == taskId)[0];
  const taskWithResults = { ...task, expression: expression, answer: result };
  const foundIndex = data.studentTasks.findIndex((x) => x.id == taskId);
  data.studentTasks[foundIndex] = taskWithResults;
  res.send(taskWithResults);
  next();
});

server.listen(4000, () => {
  console.log("JSON Server is running in 4000");
});
