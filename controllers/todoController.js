const Todo = require("../models/todo");

const getAllTodos = async (req, res) => {
    const todos = await Todo.find().populate("user");

    res.send({
      status: true,
      message: "All todos",
      total: todos.length,
    //   user: req.user,
      data: todos,
    });
  }

const createTodo = async (req, res) => {
  const { title } = req.body;

  const todoCreated = new Todo({ title, user: req.user._id });

  await todoCreated.save();

  res.send({
    status: true,
    message: "Todo created",
    data: todoCreated
  });
};

module.exports = {
    getAllTodos,
  createTodo
};
