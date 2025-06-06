import type { IItem } from "./types/IItem.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customApiCall } from "./utils/axios/globalCallSetup.ts";
import { toast } from "react-toastify";

const SingleItem = ({ item }: { item: IItem }) => {
  const queryClient = useQueryClient();
  const { mutate: editTask, isPending } = useMutation({
    mutationFn: async (isDone: boolean): Promise<unknown> => {
      return await customApiCall.patch(`/${item.id}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated");
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: async (): Promise<unknown> => {
      return await customApiCall.delete(`/${item.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
    },
  });

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
