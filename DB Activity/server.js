require("dotenv").config();
const express = require("express");

const userController = require("./controllers/userController");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res)=>{
  res.json({ message: "Here in document root" });
});

app.get("/users", userController.getUsers);

app.get("/users/:id", userController.getUser);

app.post("/users", (req, res)=>{
  res.json({ message: "Here in insert user" });
});

app.patch("/users", (req, res)=>{
  res.json({ message: "Here in update user" });
});

app.delete("/users", (req, res)=>{
  res.json({ message: "Here in delete users" });
});


app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})