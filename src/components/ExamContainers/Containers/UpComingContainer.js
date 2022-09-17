import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GradedExam from "../GradedExam";
import PendingExam from "../PendingExam";
import MissedExam from "../MissedExam";
import UpComingExam from "../UpComingExam";
import NoExam from "../NoExam";
import WithContainer from "../withContainer";
function UpComingContainer({ exams, noExamTitle}) {
    return (
       <>
            {exams.length !== 0 &&
                exams.map(({ title, exam_id, starting_at, ending_at }, i) => {
                    return (
                        <UpComingExam
                            title={title}
                            examId={exam_id}
                            startingAt={starting_at}
                            endingAt={ending_at}
                        />
                    );
                })}
            {exams.length === 0 ? <NoExam title={noExamTitle} /> : null}
        </>
    );
}

export default WithContainer(UpComingContainer);
