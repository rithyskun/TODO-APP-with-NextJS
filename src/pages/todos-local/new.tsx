import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { Todo } from "../../types/type";
import { sampleTodoData } from "../../utils/sample-data";

type ChangeInputHandler = ChangeEvent<HTMLInputElement>;

const inititalState = {
  todo: "",
  isCompleted: false,
};

const NewTodo = (): JSX.Element => {
  const [task, setTask] = useState<Todo>(inititalState);
  const router = useRouter();

  const createTask = async (tasks: Todo) => {
    const newTask = {
      todo: tasks.todo,
      isCompleted: tasks.isCompleted
    }
    setTask(tasks)
    localStorage.setItem("todos", JSON.stringify(newTask))
    setTask(inititalState)
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
      router.push("/todos-local");
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
    // const resp = await fetch("http://localhost:4001/api/todo/" + id);
    // const task = await resp.json();
    // setTask({
    //   todo: task.todo,
    //   isCompleted: task.isCompleted,
    // });
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      onLoad(router.query.id);
    }
  }, [router.query]);

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        {router.query.id ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Save</button>
        )}

        {router.query.id && (
          <button onClick={() => router.push("/todos-local")}>Return</button>
        )}
      </form>
    </>
  );
};

export default NewTodo;
