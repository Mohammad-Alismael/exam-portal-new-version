import React from "react";
import WithContainer from "../withContainer";
import UpComingExam from "../UpComingExam";
import NoExam from "../NoExam";
import PendingExam from "../PendingExam";

function PendingContainer({ exams, noExamTitle }) {
    return (
        <>
            {exams.length !== 0 &&
                exams.map(({ title, exam_id, submitted_at, see_result_at }, i) => {
                    return (
                        <PendingExam
                            key={i}
                            title={title}
                            examId={exam_id}
                            submittedAt={submitted_at}
                            see_result_at={see_result_at}
                        />
                    );
                })}
            {exams.length === 0 ? <NoExam title={noExamTitle} /> : null}
        </>
    );
}

export default WithContainer(PendingContainer);
