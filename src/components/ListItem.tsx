import { Todo } from "../types/type";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { getServerSideProps } from '../pages/todo-api/index'

type Props = {
  data: Todo;
};

function ListItem({ data }: Props) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState<Todo>();
  const handleEdit = (id: string) => {
    router.push(`/todo-api/edit/${id}`)
  };
  const handleDelete = async (id: string) => {
    await fetch("http://localhost:4001/api/todo/" + id, {
      method: "DELETE",
    });
    router.push("/todo-api");
  };

  const updateTask = async (id: string, task: Todo) => {
    await fetch("http://localhost:4001/api/todo/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsEdit(false);
  };

  const handleChange = async (item: Todo, event: any) => {
    event.preventDefault();
    const { checked } = event.target;
    try {
      let id = String(item.id);
      await updateTask(id, {
        todo: item.todo,
        isCompleted: checked,
      });
      onLoad()
    } catch (error: any) {
      console.log(error);
    }
  };

  const onLoad = async () => {
    const resp = await fetch("http://localhost:4001/api/todo/");
    const task = await resp.json();
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log(e);
      console.log(task);
    }
  };

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <>
      <input
        id="isCompleted"
        name="isCompleted"
        type="checkbox"
        onChange={() => handleChange(data, event)}
        defaultChecked={data.isCompleted}
      />
      {isEdit ? (
        <div>
          {/* <FormBase /> */}
        </div>
      ) : (
        <>
          {data.isCompleted ? (
            <span className={styles.checked}>{data.todo}</span>
          ) : (
            <div>{data.todo}</div>
          )}
        </>
      )}
      <button onClick={() => handleEdit(String(data.id))}>edit</button>
      <button onClick={() => handleDelete(String(data.id))}>x</button>
    </>
  );
}

export default ListItem;
