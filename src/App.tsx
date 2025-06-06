import { ToastContainer } from "react-toastify";
import Form from "./Form";
import Items from "./Items";
import { useGetTasks } from "./utils/hooks/queryHooks.ts";

const App = () => {
  const { data, isLoading } = useGetTasks();
  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form />
      <Items items={data?.taskList ?? []} isLoading={isLoading} />
    </section>
  );
};
export default App;
