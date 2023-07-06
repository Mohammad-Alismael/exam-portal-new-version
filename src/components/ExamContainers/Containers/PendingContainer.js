import React from "react";
import WithContainer from "../withContainer";
import UpComingExam from "../UpComingExam";
import NoExam from "../NoExam";
import PendingExam from "../PendingExam";

function PendingContainer({ exams, noExamTitle }) {
    //  submitted_at: 1688565107215, "Exam.title": "this is the dfirst midtemr 3", "Exam.exam_id": "5748f8b0-2b09-45eb-8bb0-a626c9ede5d9"
  return (
    <>
      {exams.length !== 0 &&
        exams.map((val, i) => {
          return (
            <PendingExam
              key={i}
              title={val['Exam.title']}
              examId={val['Exam.exam_id']}
              submittedAt={val.submitted_at}
              see_result_at={val.see_result_at}
            />
          );
        })}
      {exams.length === 0 ? <NoExam title={noExamTitle} /> : null}
    </>
  );
}

export default WithContainer(PendingContainer);
