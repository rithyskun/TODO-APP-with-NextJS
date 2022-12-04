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
      <>No result. Create new one instead!</>
    )}
   
  </div>
);

export default List;
