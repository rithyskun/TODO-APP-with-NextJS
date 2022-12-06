import { Todo } from "../types/type";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { socketConnection, socketEmit, socketOn } from "../utils/socket";

const ENDPOINT: string = process.env.NEXT_PUBLIC_ENDPOINT as string;

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
    await fetch(ENDPOINT + "/" + id, {
      method: "DELETE",
    });
    router.push("/todo-api");
    socketEmit("deleteTodo", id);
  };

  return (
    <div>
      {items?.length ? (
        <div className={styles.list}>
          {items?.map((item) => (
            <div key={item.id}>
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
                  <span>{item.todo}</span>
                )}
                <button onClick={() => handleEdit(String(item.id))}>
                  edit
                </button>
                <button onClick={() => handleDelete(String(item.id))}>x</button>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <>no result. create new one instead!</>
      )}
    </div>
  );
};

export default List;
