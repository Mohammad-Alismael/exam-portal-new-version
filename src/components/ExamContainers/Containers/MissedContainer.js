import React from 'react';
import WithContainer from "../withContainer";
import GradedExam from "../GradedExam";
import NoExam from "../NoExam";
import MissedExam from "../MissedExam";

function MissedContainer({ exams, noExamTitle}) {
    return (
        <>
            {exams.length !== 0 &&
                exams.map(({ title, exam_id, ending_at}, i) => {
                    return (
                        <MissedExam
                            key={i}
                            title={title}
                            examId={exam_id}
                            submittedAt={ending_at}
                        />
                    );
                })}
            {exams.length === 0 ? <NoExam title={noExamTitle} /> : null}
        </>
    );
}

export default WithContainer(MissedContainer);