import { Todo } from "../types/type";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

type Props = {
  items: Todo[];
  onChange(data: Todo, e: ChangeEvent<HTMLInputElement>): void;
};

const List = ({ items, onChange }: Props) => {
  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/todo-api/edit/${id}`);
  };
  const handleDelete = async (id: string) => {
    await fetch("http://localhost:4001/api/todo/" + id, {
      method: "DELETE",
    });
    router.push("/todo-api");
  };

  return (
    <>
      {items?.length ? (
        <ul>
          {items?.map((item) => (
            <li key={item.id}>
              <input
                id="isCompleted"
                name="isCompleted"
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(item, e)
                }
                defaultChecked={item.isCompleted}
              />

              <span>
                {item.isCompleted ? (
                  <span className={styles.checked}>{item.todo}</span>
                ) : (
                  <div>{item.todo}</div>
                )}
              </span>
              <span>
                <button onClick={() => handleEdit(String(item.id))}>
                  edit
                </button>
                <button onClick={() => handleDelete(String(item.id))}>x</button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <>no result. create new one instead!</>
      )}
    </>
  );
};

export default List;
