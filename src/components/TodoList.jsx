import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import TodoContext from "../contexts/TodoContext/TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  const { getTasks, tasks } = useContext(TodoContext);
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <AnimatePresence>
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TodoItem item={task} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default TodoList;
