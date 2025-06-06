import { ToastContainer } from 'react-toastify';
import Form from './Form';
import Items from './Items';
import {useQuery} from "@tanstack/react-query";
import {customApiCall} from "./utils/axios/globalCallSetup.ts";

const App = () => {
    const {data, isLoading} = useQuery({queryKey: ['tasks'], queryFn: async () => {
            const {data} = await customApiCall.get('/')
            return data
        }})
    return (
        <section className='section-center'>
            <ToastContainer position='top-center' />
            <Form />
            <Items items={data?.taskList ?? []} isLoading={isLoading} />
        </section>
    );
};
export default App;
