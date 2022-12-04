import Layout from "../../components/Layout";
import { Todo } from "../../types/type";
import List from "../../components/List";
import { GetStaticProps } from "next";
import NewTodo from "../todos-local/new";
import { sampleTodoData } from "../../utils/sample-data";
import { useEffect } from "react";
type Props = {
  items: Todo[];
};

const HomePage = ({ items }: Props) => {
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);
  return (
    <Layout title="Todo App with local">
      <h1>Todo App (Local)</h1>
      <NewTodo />
      <List items={items} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const items: Todo[] = sampleTodoData;

  return { props: { items } };
};

export default HomePage;
