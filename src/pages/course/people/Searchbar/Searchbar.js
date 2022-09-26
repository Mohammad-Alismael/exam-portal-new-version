import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setCourseClassmates, setFilteredClassmates} from "../../../../actions/CourseAction";
const useStyles = makeStyles((theme) => ({
    searchbarContainer: {
        marginBottom: 30,
        borderRadius: 25,
        width: 'calc(63% + 20px)',
        backgroundColor: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
    },
    searchbar: {
        border: 'none',
        width: '90%',
        fontSize: 18,
        "& :focus": {
            outline: 'none'
        }
    },
    searchbarIcon: {
        padding: 10
    }
}));

export default function Searchbar(props) {
    const classes = useStyles();
    const [searchTerm,setSearchTerm] = useState();
    const {classmates} = useSelector(state => state.CourseReducer);
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        console.log(classmates)
        const filteredClassMates = classmates.filter(({username},i)=>{
            return username.includes(e.target.value)
        })
        console.log(filteredClassMates)
        dispatch(setFilteredClassmates(filteredClassMates))
    }
    return <div className={classes.searchbarContainer}>
        <img className={classes.searchbarIcon} src={"/images/icons/searchbar_icon.svg"} alt={"searchbar_logo"}/>
        <input type={"text"} onChange={handleChange} className={classes.searchbar} placeholder={"Search for a friend"}/>
    </div>;
}

Searchbar.propTypes = {classes: PropTypes.any};