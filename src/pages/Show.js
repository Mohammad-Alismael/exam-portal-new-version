import React, {Component} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Exam from "../components/Exam";
import ExamCard from "../components/ExamCard";
import QuestionHeader from "../components/QuestionHeader";

class Show extends Component {
    render() {
        return (
            <>
                <AppBar
                    sx={{ position: 'fixed',bgcolor:"#ffd05e"}}>
                    <Toolbar>
                        <Typography style={{color:"black"}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Exam id : fdgerg3e44fsdfdsvgvaet4e354556456434357657
                        </Typography>
                        <Button style={{ textTransform: 'none' }}
                                color="primary"
                        >
                            update exam
                        </Button>
                    </Toolbar>
                </AppBar>
                <h1>exam component</h1>
                <Exam
                    key={0}
                    examTitle={'abc'}
                    examId={'fdgerg3e44fsdfdsvgvaet4e354556456434357657'}
                    startingAt={1658828828062}
                    endingAt={1658828928062}
                />
                <ExamCard examId={'fdgerg3e44fsdfdsvgvaet4e354556456434357657'} examTitle={'abc'}/>
                <QuestionHeader/>
            </>
        );
    }
}

export default Show;