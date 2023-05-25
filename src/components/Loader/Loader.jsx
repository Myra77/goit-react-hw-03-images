import { ThreeDots } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

export default function Loader () {
    return(
        <div className={css.Loader}> 
            <ThreeDots 
                height="100" 
                width="100" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
};