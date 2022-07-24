import {createTheme, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
        position: 'relative'
    },
    textField: {
        width: '100%',
    },
    dropDown: {
        margin:"50px"
    },
    deleteIcon : {
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
        // paddingTop: 20
    }
}));

export const authStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#1a1a1a',
    },
    paperStyle: {
        padding: 30,
        height: '70vh',
        width: '35%',
        margin: "30px auto"
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        maxWidth: '320px',
        align: 'center',
    },
    signUpBtn: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: 17,
        maxWidth: '40%',
        maxHeight: '50px',
        padding: '16px'
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

export const theme = createTheme({
    spacing: 4,
    typography: {
        h3: {
            fontSize: 32,
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: 'rgb(255,255,255)'
        },
        secondary: {
            main: 'rgb(0,0,0)',
        },
        warning: {
            main: 'rgb(255,208,94)',
        },

    },
    background: {
        default: "#222222",
    }
})