import { Todo } from "../types/type";
import { formatDateLocal } from "../utils/helper";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react'

type Props = {
  data: Todo;
};

function ListItem({ data }: Props) {
  const router = useRouter();
  const [ isEdit, setIsEdit ] = useState(false)
  const handleEdit = (id: string) => {
    
    router.push(`/todo-api/edit/${id}`);
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
  };

  const handleChange = async (item: Todo, event: any) => {
    const { checked } = event.target;
    try {
      let id = String(item.id);
      await updateTask(id, {
        todo: item.todo,
        isCompleted: checked,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        className={styles.checked}
        id="isCompleted"
        name="isCompleted"
        type="checkbox"
        onChange={() => handleChange(data, event)}
        defaultChecked={data.isCompleted}
      />
      {isEdit ? (
        <input type="text" id="todo" name="todo" defaultValue={data.todo} />
      ) : (
        <>{data.todo}</>
      )}
      <button onClick={() => handleEdit(String(data.id))}>edit</button>
      <button onClick={() => handleDelete(String(data.id))}>delete</button>
    </div>
  );
}

export default ListItem;
