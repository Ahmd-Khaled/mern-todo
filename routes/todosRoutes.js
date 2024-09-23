const express = require("express");
const verifyToken = require("../utils/verifyToken");
const Todo = require("../models/todo");
const { createTodo, getAllTodos } = require("../controllers/todoController");

const router = express.Router();
// -------------------- get all todos -------------------------
router.get("/", verifyToken, getAllTodos);
// -------------------- get todo details -------------------------
router.get("/:id", (req, res) => {
  console.log("User details");
  res.send({
    status: true,
    message: "User details",
  });
});
// -------------------- delete todo -------------------------
router.delete("/:id", (req, res) => {
  console.log("User deleted");
  res.send({
    status: true,
    message: "User deleted successfully",
  });
});
// -------------------- update todo -------------------------
router.patch("/:id", (req, res) => {
  console.log("User updated");
  res.send({
    status: true,
    message: "User updated successfully",
  });
});
// -------------------- create todo -------------------------
router.post("/create", verifyToken, createTodo);

module.exports = router;
