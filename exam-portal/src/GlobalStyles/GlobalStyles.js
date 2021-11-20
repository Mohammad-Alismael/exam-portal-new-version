import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    paperStyle: {
        padding: 30,
        height: '70vh',
        width: '35%',
        margin: "30px auto"


    },
    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        maxWidth: '20%',
    },
    form: {
        maxWidth: '320px',
        // marginTop: theme.spacing(1),
        align: 'center',
    },

    signin: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: 17
    },
    title: {
        flexGrow: 1,
    },

    container: {
        display: "flex",
        alignItems: "center"
    },
    border: {
        borderBottom: "2px solid lightgray",
        width: "100%"
    },
}));