import React, { useContext, useState } from "react";

import { FaPlus } from "react-icons/fa";
import TodoContext from "../contexts/TodoContext/TodoContext";
import Alert from "./Alert";

function Form() {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const { addTask } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setTimeout(()=>setError(""),2000);
      return setError("Title of a Todo Task cant be empty ! ");
    }

    addTask({
        title: text,
        done: false,
    });

    setText("");
    setError(null);
    
  };

  return (
    <>
    <div className="mb-4">
      {error && <Alert type="error" message={error} />}

    </div>
      <form
        className="card bg-base-100 shadow-xl  space-y-5 pb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center md:text-4xl">Add a Todo Task : </h2>
        <div className="m-4">
          <input
            id="title"
            type="text"
            className="input w-full  hover:border-primary border-slate-600"
            placeholder="✍️ Add Task...."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-center ">
          <button type="submit" className="btn btn-primary ">
            <FaPlus color="white" />
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
