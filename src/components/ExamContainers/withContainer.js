import React from "react";
import UpComingExam from "./UpComingExam";
import NoExam from "./NoExam";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    itemContainer: {
        // backgroundColor: 'blue',
        width: "50%",
        height: "80%",
        margin: " 2rem",
    },
    elementsContainer: {
        overflowY: "auto",
        height: "75%",
        "&::-webkit-scrollbar": {
            width: "0 !important",
        },
    },
    itemContainerHeader: {
        color: "#fff",
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: 22,
        margin: "1rem 0",
        padding: 0,
    },
}));
function WithContainer(WrappedComponent) {
    return function New(props) {
        const classes = useStyles();
        return (
            <div className={classes.itemContainer}>
                <h4 className={classes.itemContainerHeader}>{props.title}</h4>
                <div className={classes.elementsContainer}>
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    };
}

export default WithContainer;
