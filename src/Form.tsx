import { type SyntheticEvent } from "react";
import { useCreateTask } from "./utils/hooks/queryHooks.ts";

const Form = () => {
  const { newItemName, isPending, setNewItemName, createTask } =
    useCreateTask();

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
