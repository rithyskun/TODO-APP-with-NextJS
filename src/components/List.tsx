import ListItem from "./ListItem";
import { Todo } from "../types/type";

type Props = {
  items: Todo[];
};

const List = ({ items }: Props) => (
  <>
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
  </>
);

export default List;
