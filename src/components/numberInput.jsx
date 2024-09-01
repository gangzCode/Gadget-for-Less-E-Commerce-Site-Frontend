import commonStyles from "../styles/commonStyles.module.css"
import {Add, Remove} from "@mui/icons-material";

const NumberInput = ({value, increment, decrement}) => {
    return (
        <div className={commonStyles.numberInputContainer}>
            <div style={{width:'40px'}} className={commonStyles.numberInputBtn} onClick={decrement}>
                <Remove style={{fontSize: '14px'}}/>
            </div>
            <div style={{width:'50px'}} className={commonStyles.numberInput}>
                {value}
            </div>
            <div style={{width:'40px'}} className={commonStyles.numberInputBtn} onClick={increment}>
                <Add style={{fontSize: '14px'}}/>
            </div>
        </div>
    );
}
export default NumberInput;
