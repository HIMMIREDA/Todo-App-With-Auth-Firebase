import { createContext, useState, useReducer } from "react";

import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  addDoc,
  where,
  getDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "tasks");

  const getTasks = async () => {
    const q = query(
      tasksCollectionRef,
      where("userId", "==", getAuth().currentUser.uid),
      orderBy("timeStamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const arrayOfTasks = [];
    querySnapshot.forEach((doc) => {
      arrayOfTasks.push({ id: doc.id, ...doc.data() });
    });
    setTasks(arrayOfTasks);
  };

  const addTask = async ({ title, done }) => {
    const newDocRef = await addDoc(tasksCollectionRef, {
      title,
      done,
      userId: getAuth().currentUser.uid,
      timeStamp: serverTimestamp(),
    });

    const newDoc = await getDoc(newDocRef);
    if (newDoc.exists()) {
      setTasks((prevState) => [
        { ...newDoc.data(), id: newDoc.id },
        ...prevState,
      ]);
    }
  };

  const updateTaskStatus = async (id, done) => {
    const docUpdate = doc(db, "tasks", id);

    await updateDoc(docUpdate, {
      done,
    });

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = async (id) => {
    const docDelete = doc(db, "tasks", id);
    await deleteDoc(docDelete);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        getTasks,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
