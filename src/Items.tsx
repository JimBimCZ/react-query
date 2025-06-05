import SingleItem from './SingleItem';
import type {IItem} from "./types/IItem.ts";
const Items = ({ items }: {items: IItem[]}) => {
    return (
        <div className='items'>
            {items.map((item: IItem) => {
                return <SingleItem key={item.id} item={item} />;
            })}
        </div>
    );
};
export default Items;
