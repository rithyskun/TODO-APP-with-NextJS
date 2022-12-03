import Layout from "../../components/Layout";
import { Todo } from "../../types/type";
import List from "../../components/List";
import { GetServerSideProps } from "next";
import Form from "../../components/Form";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
type ChangeInputHandler = ChangeEvent<HTMLInputElement>;

type Props = {
  todos: Todo[];
};

const HomePage = ({todos}: Props) => {
  return (
    <Layout>
      <h1>Todo List with API</h1>
        <Form />
      <List items={todos} />
    </Layout>
  );
};

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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4001/api/todo");
  const todos = await res.json();
  return {
    props: { todos },
  };
};

export default HomePage;
