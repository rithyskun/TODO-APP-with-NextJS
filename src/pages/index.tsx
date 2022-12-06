import Layout from "../components/Layout";
import { Todo } from "../types/type";
import { GetServerSideProps } from "next";
type Props = {
  todos: Todo[];
};

const HomePage = ({todos}: Props) => {
  return (
    <Layout title="Todo App">
     <h1>Welcome to Todo</h1>
    </Layout>
  );
};


export default HomePage;
