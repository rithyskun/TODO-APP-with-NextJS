import ListItem from "./ListItem";
import { Todo } from "../types/type";

type Props = {
  items: Todo[];
};

const List = ({ items }: Props) => (
  <div>
    {items?.length ? (
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            <ListItem data={item} />
          </li>
        ))}
      </ul>
    ) : (
      <div>Empty List</div>
    )}
  </div>
);

export default List;
