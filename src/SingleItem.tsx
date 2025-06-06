import type { IItem } from "./types/IItem.ts";
import { useUpdateAndDeleteTask } from "./utils/hooks/queryHooks.ts";

const SingleItem = ({ item }: { item: IItem }) => {
  const { editTask, deleteTask, isDeleting, isPending } =
    useUpdateAndDeleteTask(item);

  const onStatusChange = () => {
    editTask(!item.isDone);
  };

  const onDeleteBtnClick = () => {
    deleteTask();
  };

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={onStatusChange}
        disabled={isPending || isDeleting}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone ? "line-through" : "none",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={onDeleteBtnClick}
        disabled={isPending || isDeleting}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
