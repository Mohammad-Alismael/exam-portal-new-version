import {createTheme, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paperStyle:{
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
        position: 'relative'
    },
    textField:{
        width: '100%',
    },
    dropDown:{
        margin:"50px"
    },
    deleteIcon:{
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
    }
}));

export const authStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
        backgroundColor: '#1a1a1a',
    },
    paperStyle:{
        padding: 30,
        height: '70vh',
        width: '35%',
        margin: "30px auto"
    },
    paper:{
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form:{
        maxWidth: '320px',
        align: 'center',
    },
    signUpBtn:{
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
            main: '#FFCD38'
        },
        secondary: {
            main: 'rgb(0,0,0)'
        },
        warning: {
            main: '#FFCD38',
        },
        white: {
            main: 'rgb(255,255,255)'
        },
        success: {
            main: 'rgb(84,255,56)'
        },
        error: {
            main: 'rgb(255,104,56)'
        }
    },
    background: {
        default: "#222222",
    }
})

export const useStyleExamStudentCard = makeStyles((theme)=> ({
    circle:(props) => ({
        display: "inline-flex",
        justifyContent: 'center',
        alignItems: 'center',
        border: `3px solid ${props.color}`,
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        margin: "0.5rem",
        "& span:nth-child(1)": {
            fontWeight: "semi-bold",
            display: "block",
            fontSize: 12,
            color: `${props.color}`,
        },
    }),
    examTitle: {
        textTransform: 'capitalize',
        paddingBottom: "0.1rem",
        fontWeight: "bold",
    },
    submittedAt: {
        fontSize: "10px",
        color: '#818181'
    }
}))