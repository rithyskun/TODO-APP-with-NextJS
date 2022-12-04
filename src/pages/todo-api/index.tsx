import Layout from "../../components/Layout";
import { Todo } from "../../types/type";
import List from "../../components/List";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import FormBase from "../../components/FormBase";

type Props = {
  todos: Todo[];
};

const HomePage = ({ todos }: Props) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    let target = e.target as HTMLInputElement;
    setFilter(target.value);
  };

  const fillted = todos.filter((item) => {
    return item.todo.toLowerCase().includes(filter);
  });

  const handleChangeSearch = () => {
    setSearch(!search);
    setFilter("");
  };

  return (
    <Layout title="Todo App">
      <h1>Todo App (API)</h1>
      {search ? (
        <div>
          <input
            type="search"
            id="filter"
            name="filter"
            onChange={handleSubmit}
            placeholder="Search"
          />
          <button onClick={handleChangeSearch}>reset</button>
        </div>
      ) : (
        <div>
          <FormBase />
          <button onClick={handleChangeSearch}>filter</button>
        </div>
      )}
      <List items={fillted} />
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
