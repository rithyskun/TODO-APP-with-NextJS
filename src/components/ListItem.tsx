import Link from "next/link";
import { Todo } from "../types/type";
import { formatDateLocal } from "../utils/helper";
import Router from "next/router";

type Props = {
  data: Todo;
};

function ListItem({ data }: Props) {
  const handleEdit = (id: string) => {
    Router.push(`/todo-api/${id}`);
  };
  const handleDelete = async (id: string) => {
    await fetch("http://localhost:4001/api/todo/" + id, {
      method: "DELETE",
    });
    Router.push("/");
  };

  return (
    <div>
      {!data.isEdit ? (
        <div>
          {data.todo} | {formatDateLocal(data.createdAt)}
          <input
            id="isCompleted"
            name="isCompleted"
            type="checkbox"
            defaultChecked={data.isCompleted}
          />
          <label htmlFor="isCompleted">isCompleted</label>
          <div>
            <button onClick={() => handleEdit(String(data.id))}>edit</button>
            <button onClick={() => handleDelete(String(data.id))}>
              delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
}

// const ListItem = ({ data }: Props) => (

//   <div>
//     {data.isEdit ? (
//       <div>
//         {items.todo} | {formatDateLocal(data.createdAt)}
//         <input
//           id="isCompleted"
//           name="isCompleted"
//           type="checkbox"
//           defaultChecked={data.isCompleted}
//         />
//         <label htmlFor="isCompleted">isCompleted</label>
//         <div>
//           <button onClick={() => handleEdit(String(data.id))}>edit</button>
//           <button onClick={() => handleDelete(String(data.id))}>delete</button>
//         </div>
//       </div>
//     ) : (
//       <div>
//         <input type="text" id="todo" name="todo" value={task}></input>
//         <input
//           id="isCompleted"
//           name="isCompleted"
//           type="checkbox"
//           defaultChecked={data.isCompleted}
//         />
//         <label htmlFor="isCompleted">isCompleted</label>
//         <div>
//           <button onClick={() => handleEdit(String(data.id))}>edit</button>
//           <button onClick={() => handleDelete(String(data.id))}>delete</button>
//         </div>
//       </div>
//     )}
//   </div>
// );

export default ListItem;
