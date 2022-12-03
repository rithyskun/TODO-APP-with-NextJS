import { Todo } from "../../../types/type";
import { formatDateLocal } from '../../../utils/helper'

type Props = {
  data: Todo;
};
const ListItem = ({ data }: Props) => (
  <div className="flex">
    {data.todo} | {formatDateLocal(data.createdAt)}
    <div>
      <input
        id="isCompleted"
        name="isCompleted"
        type="checkbox"
        checked={data.isCompleted}
      />
      <label htmlFor="isCompleted">isCompleted</label>
    </div>
  </div>
);

export default ListItem;
