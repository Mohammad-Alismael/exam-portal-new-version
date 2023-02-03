import React, { Component, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: "15vh auto",
        width: "50%",
        margin: "30px auto",
        position: "relative",
    },
    textField: {
        width: "100%",
    },
    dropDown: {
        margin: "50px",
    },
    menuIcon: {
        float: "right",
        cursor: "pointer",
        position: "absolute",
        top: 15,
        right: 15,
        // paddingTop: 20
    },
}));
function QuestionHeader({ questionIndex }) {
    const classes = useStyles();
    const [questionText, setQuestionText] = React.useState("empty");
    const [whoCanSee, setWhoCanSee] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();

    // const updateQuestionText = (e) => {
    //     setQuestionText(e.target.value)
    //     const deepCopy = [...exam.PreviewQuestions];
    //         deepCopy[id] = {
    //             ...deepCopy[id],
    //             questionText: e.target.value,
    //         };
    //     dispatch({ type: SET_QUESTIONS, payload: { PreviewQuestions: deepCopy } });
    //     console.log("new",exam.PreviewQuestions[id]['questionText'])
    // };
    // const handleWhoCanSee = (e) => {
    //     const deepCopy = [...exam.PreviewQuestions];
    //     deepCopy[id] = {...deepCopy[id],whoCanSee:parseInt(e.target.value)}
    //     dispatch({ type: SET_QUESTIONS, payload: { PreviewQuestions: deepCopy } });
    // }
    // const handleQuestionType = (e) => {
    //     const deepCopy = [...exam.PreviewQuestions];
    //     deepCopy[id] = {...deepCopy[id],questionType:parseInt(e.target.value)}
    //     dispatch({ type: SET_QUESTIONS, payload: { PreviewQuestions: deepCopy } });
    // }
    // const handlePoints = (e) =>{
    //     const deepCopy = [...exam.PreviewQuestions];
    //     deepCopy[id] = {...deepCopy[id],points:parseInt(e.target.value)}
    //     dispatch({ type: SET_QUESTIONS, payload: { PreviewQuestions: deepCopy } });
    // }

    return (
        <></>
        // <Paper className={classes.paperStyle}>
        //     <Grid container>
        //         <Grid item xs={10}>
        //             <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
        //                 {exam.PreviewQuestions[questionIndex].questionText}
        //             </Typography>
        //         </Grid>
        //         <Grid item xs={2}>
        //             <Typography style={{color:"black"}} sx={{ float: 'right', flex: 1 }} variant="h6">
        //                 {exam.PreviewQuestions[questionIndex].points} points
        //             </Typography>
        //         </Grid>
        //         <Grid item xs={12}>
        //             <Wrapped {...props} />
        //         </Grid>
        //     </Grid>
        // </Paper>
        // <>
        //     <Grid xs={6} item>
        //         <TextField
        //             id="outlined-uncontrolled"
        //             label="Question text"
        //             // size="small"
        //             value={exam.PreviewQuestions[questionIndex]["questionText"]}
        //             defaultValue={""}
        //             fullWidth
        //             // onChange={updateQuestionText}
        //             variant="standard"
        //         />
        //     </Grid>
        //     <ImageIcon
        //         sx={{
        //             height: "40px",
        //             width: "40px",
        //             margin: "20px 5px",
        //             cursor: "pointer",
        //         }}
        //     />
        //     <Grid xs={2} item>
        //         <FormControl fullWidth variant="standard">
        //             <InputLabel id="type">Question Type</InputLabel>
        //             <Select
        //                 // onChange={handleQuestionType}
        //                 labelId="type"
        //                 id="type"
        //                 disabled={false}
        //                 value={exam.PreviewQuestions[questionIndex]?.questionType}
        //                 label="Question type"
        //             >
        //                 <MenuItem value={1}>MCQs</MenuItem>
        //                 <MenuItem value={2}>Text</MenuItem>
        //                 <MenuItem value={3}>Checkbox</MenuItem>
        //                 <MenuItem value={4}>Matching</MenuItem>
        //                 <MenuItem value={5}>True/False</MenuItem>
        //             </Select>
        //         </FormControl>
        //     </Grid>
        //     <Grid xs={2} item>
        //         <FormControl fullWidth variant="standard">
        //             <InputLabel id="type">Who can see</InputLabel>
        //             <Select
        //                 value={exam.PreviewQuestions[questionIndex]?.whoCanSee}
        //                 label="Who can see"
        //                 // onChange={handleWhoCanSee}
        //             >
        //                 <MenuItem value={1}>Undergraduate</MenuItem>
        //                 <MenuItem value={2}>Graduate</MenuItem>
        //                 <MenuItem value={3}>Undergraduate & Graduate</MenuItem>
        //             </Select>
        //         </FormControl>
        //     </Grid>
        //     <Grid xs={1} item>
        //         <FormControl fullWidth variant="standard">
        //             <TextField
        //                 type="number"
        //                 fullWidth
        //                 value={exam.PreviewQuestions[questionIndex]?.points}
        //                 // onChange={handlePoints}
        //                 variant="standard"
        //                 inputProps={{ min: 1, max: 100 }}
        //                 label={"points"}
        //             />
        //         </FormControl>
        //         {/*<LongMenu*/}
        //         {/*    className={classes.menuIcon}*/}
        //         {/*    options={["delete", "duplicate", "preview question"]}*/}
        //         {/*/>*/}
        //     </Grid>
        // </>
    );
}

export default QuestionHeader;
