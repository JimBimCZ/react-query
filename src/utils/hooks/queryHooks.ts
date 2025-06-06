import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customApiCall } from "../axios/globalCallSetup.ts";
import { toast } from "react-toastify";
import { useState } from "react";
import type { IItem } from "../../types/IItem.ts";

export const useGetTasks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customApiCall.get("/");
      return data;
    },
  });

  return { data, isLoading };
};

export const useCreateTask = () => {
  const [newItemName, setNewItemName] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (taskTitle: string): Promise<unknown> =>
      customApiCall.post("/", { title: taskTitle }),
    onSuccess: () => {
      setNewItemName("");
      toast.success("task added");
      queryClient.invalidateQueries({ queryKey: ["tasks"] }).then((result) => {
        console.log(result);
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { newItemName, createTask, isPending, setNewItemName };
};

export const useUpdateAndDeleteTask = (item: IItem) => {
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

  return { isDeleting, isPending, editTask, deleteTask };
};
