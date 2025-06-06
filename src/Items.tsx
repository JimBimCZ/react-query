import SingleItem from './SingleItem';
import type {IItem} from "./types/IItem.ts";
const Items = ({ items, isLoading }: {items: IItem[], isLoading: boolean}) => {
    return (
        <div className='items'>
            {!items || isLoading ? <p style={{marginTop: '1rem'}}>Loading...</p> : items.map((item: IItem) => {
                return <SingleItem key={item.id} item={item} />;
            })}
        </div>
    );
};
export default Items;
