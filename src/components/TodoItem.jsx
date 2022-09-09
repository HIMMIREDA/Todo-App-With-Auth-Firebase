import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import TodoContext from "../contexts/TodoContext/TodoContext";

function TodoItem({ item }) {

  const { updateTaskStatus, deleteTask } = useContext(TodoContext);

  const handleChangeTaskStatus = () => {
    updateTaskStatus(item.id,!item.done);
  };

  const handleClickDelete = () => {
    deleteTask(item.id);
  };
  return (
    <div
      className="card shadow-xl flex flex-row items-center justify-between p-10"
      style={{ backgroundColor: item.done ? "#1FB2A6" : "" }}
    >
      <p className="text-3xl md:text-4xl" style={{color: item.done ? "#fff" : ""}}>{item.title}</p>

      <div className="flex items-center space-x-8">
        <input
          type="checkbox"
          checked={item.done}
          className="checkbox checkbox-accent"
          onChange={handleChangeTaskStatus}
        />

        <button className="btn btn-error" onClick={handleClickDelete}>
          <FaTrash color="white" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
