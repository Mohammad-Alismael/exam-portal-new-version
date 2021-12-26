import React, {useEffect} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {toast} from "react-toastify";
function CheckboxComp(props) {
    const [selectedAnswer,setSelectedAnswer] = React.useState([]);
    const handleChange = (e) => {
        const a = parseInt(e.target.value)
        if (selectedAnswer.includes(a)){
            const deepCopy = [...selectedAnswer]
            deepCopy.splice(deepCopy.indexOf(a))
            setSelectedAnswer(deepCopy)
        }else {
            setSelectedAnswer([...selectedAnswer,a])
        }
        
        toast.info(e.target.value)
    }

    return (
        <FormGroup onChange={handleChange}>
            {
                props.options.map((val,index)=> {
                    return (<FormControlLabel
                        value={index}
                        control={<Checkbox/>}
                        label={val} />)
                })
            }
            <button onClick={()=>(console.log(selectedAnswer))}>click</button>
        </FormGroup>
    );
}

export default CheckboxComp;