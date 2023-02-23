import {Container, OptionBarContainer, QuestionDetails} from "./QuestionsStats.styles";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {convertToHTML} from "draft-convert";
import {calcState} from "../../../../utils/global/GlobalConstants";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";

const QuestionsStats = () => {
    return (
        <Container>
            <QuestionDetails>
                <span>Question 1</span>
                <p>What is something you can never seem to finish?</p>
                <RadioGroup name="radio-buttons-group">
                    {[1,2,3,4].map((val, index) => {
                        return (
                            <Grid item fullwidth sx={{ml:5}}>
                                <FormControlLabel
                                    value={index}
                                    control={
                                        <Radio disabled={true}/>
                                    }
                                    label={
                                        <p>option {index}</p>
                                    }
                                />
                            </Grid>
                        );
                    })}
                </RadioGroup>
            </QuestionDetails>
            <QuestionsStats.OptionBar />
        </Container>
    )
}
const OptionBar = () => {
    return (
        <OptionBarContainer>
            <LinearProgressWithLabel value={45} />
            <LinearProgressWithLabel value={12} />
            <LinearProgressWithLabel value={28} />
            <LinearProgressWithLabel value={69} />
        </OptionBarContainer>
    )
}
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <span>option 1</span>
            <Box sx={{ width: '80%', mr: 4,ml: 4 }}>
                <LinearProgress sx={{height: '33px'}} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )} %`}</Typography>
            </Box>
        </Box>
    );
}
QuestionsStats.OptionBar = OptionBar
export default QuestionsStats;