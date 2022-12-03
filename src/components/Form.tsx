import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { Todo } from "../types/type";
type ChangeInputHandler = ChangeEvent<HTMLInputElement>;

const inititalState = {
  todo: "",
  isCompleted: false,
  isEdit: true,
};


const Form = (): JSX.Element => {
  const [task, setTask] = useState<Todo>(inititalState);
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const createTask = async (task: Todo) => {
    await fetch("http://localhost:4001/api/todo", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        await updateTask(router.query.id, task);
      } else {
        await createTask(task);
      }
      setTask(inititalState);
      router.push("/todo-api");
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = ({
    target: { name, value, type, checked },
  }: ChangeInputHandler) => {
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onLoad = async (id: string) => {
    const resp = await fetch("http://localhost:4001/api/todo/" + id);
    const task = await resp.json();

    setTask({
      todo: task.todo,
      isCompleted: task.isCompleted,
    });
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      onLoad(router.query.id);
    }
  }, [router.query]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {router.query.id ? (
          <div>
            <input
              type="text"
              name="todo"
              id="todo"
              value={task.todo}
              onChange={handleChange}
              placeholder="input task"
            />
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              onChange={handleChange}
              checked={task.isCompleted}
            />
            <label htmlFor="isCompleted">isCompleted</label>
          </div>
        ) : (
          <input
            type="text"
            name="todo"
            id="todo"
            value={task.todo}
            onChange={handleChange}
            placeholder="input task"
          />
        )}

        {router.query.id ? <button>Update</button> : <button>Save</button>}

        {router.query.id && (
          <button onClick={() => router.push("/todo-api")}>Return</button>
        )}
      </form>
    </>
  );
};

export default Form;
