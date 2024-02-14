import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
