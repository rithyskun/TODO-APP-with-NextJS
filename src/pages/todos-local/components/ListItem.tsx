import { Todo } from "../../../types/type";

type Props = {
  data: Todo;
};
const Item = ({ item, handleComplete, handleRemove }: any) => {
  return (
    <div onClick={handleComplete(item.id)}>
      <input
        type="checkbox"
        id="isCompleted"
        name="isCompleted"
        defaultChecked={item.isCompleted}
      />

      <label htmlFor="todo">
        <span>{item.todo}</span>
      </label>
      <button onClick={handleRemove}>x</button>
    </div>
  );
};

export default Item;
