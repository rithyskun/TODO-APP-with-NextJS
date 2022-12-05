import Layout from "../../components/Layout";
import { Todo } from "../../types/type";
import List from "../../pages/todos-local/components/List";
import ListItem from "../../pages/todos-local/components/ListItem";
import Form from "../../pages/todos-local/components/From";
import { GetStaticProps, GetServerSideProps } from "next";
import { sampleTodoData } from "../../utils/sample-data";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
  items: Todo[];
};
type ChangeInputHandler = ChangeEvent<HTMLInputElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

const inititalState = {
  todo: "",
  isCompleted: false,
};

const HomePage = ({ items }: Props): JSX.Element => {
  const [task, setTask] = useState<Todo>(inititalState);
  const createTask = async (task: Todo) => {
    if (!task.todo) {
      return alert("The task require!");
    }
    const response = await fetch("http://localhost:4001/api/todo", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 409) {
      return alert("The task exist!");
    }
    return response;
  };

  const hanleSubmit = (e: InputEvent) => {
    e.preventDefault();
    let target = e.target.value;
  };

  const handlerRemoveCompleted = () => {};

  const handleCompleteItem = () => {};

  const handleRemoveItem = () => {};
  return (
    <Layout>
      <h1>Todo App with local</h1>
      <div>
        <List title="Task List" handleRemoveCompleted={handlerRemoveCompleted}>
          <form onSubmit={() => hanleSubmit}>
            <input
              type="text"
              id="todo"
              name="todo"
              placeholder="add a new item"
            />
          </form>

          {items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              handleComplete={handleCompleteItem}
              handleRemove={handleRemoveItem}
            />
          ))}
        </List>
      </div>
    </Layout>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const items: Todo[] = sampleTodoData;
//   return { props: { items } };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4001/api/todo");
  const items = await res.json();
  return {
    props: { items },
  };
};

export default HomePage;
