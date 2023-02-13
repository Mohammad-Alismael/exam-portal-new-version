import React from 'react';
import WithContainer from "../withContainer";
import PendingExam from "../PendingExam";
import NoExam from "../NoExam";
import GradedExam from "../GradedExam";

function GradedContainer({ exams, noExamTitle}) {
    return (
        <>
            {exams.length !== 0 &&
                exams.map(({ title, exam_id, submitted_at }, i) => {
                    return (
                        <GradedExam
                            key={i}
                            title={title}
                            examId={exam_id}
                            percent={43}
                            submittedAt={submitted_at}
                        />
                    );
                })}
            {exams.length === 0 ? <NoExam title={noExamTitle} /> : null}
        </>
    );
}

export default WithContainer(GradedContainer);