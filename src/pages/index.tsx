import Layout from "../components/Layout";
import { Todo } from "../types/type";
import List from "../components/List";
import { GetServerSideProps } from "next";
import NewTodo from "./todo-api/new";
type Props = {
  todos: Todo[];
};

const HomePage = ({todos}: Props) => {
  return (
    <Layout title="Todo App">
      <h1>Todo List with API</h1>
        <NewTodo />
      <List items={todos} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4001/api/todo");
  const todos = await res.json();
  return {
    props: { todos },
  };
};

export default HomePage;