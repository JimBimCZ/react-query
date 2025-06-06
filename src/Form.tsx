import { type SyntheticEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customApiCall } from "./utils/axios/globalCallSetup.ts";
import { toast } from "react-toastify";

const Form = () => {
  const [newItemName, setNewItemName] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (taskTitle: string): Promise<unknown> =>
      customApiCall.post("/", { title: taskTitle }),
    onSuccess: () => {
      setNewItemName("");
      toast.success("task added");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    console.log("here");
    e.preventDefault();
    createTask(newItemName);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={isPending}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
