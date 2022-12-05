import Layout from "../../components/Layout";
import { Todo } from "../../types/type";
import List from "../../components/List";
import { GetServerSideProps } from "next";
import { useState, ChangeEvent, useEffect } from "react";
import FormBase from "../../components/FormBase";
import { useRouter } from "next/router";
import {
  socketConnection,
  socketEmit,
  socketOn,
} from "../../utils/socket";

type Props = {
  todos: Todo[];
};

const HomePage = ({ todos }: Props) => {
  useEffect(() => {
    socketConnection();
    socketOn("updated", (payload: any) => {
      refreshPage();
    });
  });

  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const fillted = todos?.filter((item: Todo) => {
    return item.todo.toLowerCase().includes(keyword);
  });

  const handleChangeSearch = () => {
    setSearch(!search);
    setKeyword("");
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

  const handleChange = async (data: Todo, e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    try {
      let id = String(data.id);
      await updateTask(id, {
        todo: data.todo,
        isCompleted: checked,
      });
      router.push("/todo-api");
    } catch (error: any) {
      console.log(error);
    }
  };

  const refreshPage = () => {
    router.replace(router.asPath)
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
        <div className="styles.list">
          <FormBase />
          <button onClick={handleChangeSearch}>filter</button>
        </div>
      )}
      <section>
        <List items={fillted} onChange={handleChange} />
      </section>
    </Layout>
  );
};

// HomePage.getInitialProps = async () => {
//   const res = await fetch("http://localhost:4001/api/todo");
//   const todos = await res.json();

//   return { todos: todos}
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:4001/api/todo");
  const todos = await res.json();
  return {
    props: { todos },
  };
};

export default HomePage;
