import todoModel from "../models/todo.js";

// create todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    const newTodo = await todoModel.create({ title, description, user });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all todo
export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find().populate("user");
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get a todo
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById(id).populate("user");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delte todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
