import TodoListItem from "./TodoListItem";
import { Todo } from "../../../types/type";
import Router from "next/router";

type Props = {
  items: Todo[];
};

const List = ({ items }: Props) => (
  <div>
    {items?.length ? (
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            <TodoListItem data={item} />
            <div>
              <button onClick={() => handleEdit(String(item.id))}>edit</button>
              <button onClick={() => handleDelete(String(item.id))}>
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div>Empty List</div>
    )}
  </div>
);
const handleEdit = (id: string) => {
  Router.push(`/todo-local/edit/${id}`);
};
const handleDelete = async (id: string) => {
  await fetch("http://localhost:4001/api/todo/" + id, {
    method: "DELETE",
  });
  Router.push("/");
};


export default List;
