import {convertFromRaw, EditorState} from "draft-js";
import DOMPurify from "dompurify";

export const UNDERGRAD_STUDENT_ROLE = [1]
export const GRAD_STUDENT_ROLE = [2]
export const INSTRUCTOR_ROLE = [3]
export const STUDENT_ROLES = [1,2]
export const ALL_ROLES = [1,2,3]
export const NOT_FOUND = -1;
export const MCQ_QUESTION_TYPE = 1;
export const TEXT_QUESTION_TYPE = 2;
export const CHECKBOX_QUESTION_TYPE = 3;
export const MATCHING_QUESTION_TYPE = 4;
export const TRUTH_QUESTION_TYPE = 5;

export const steps = [
    "Exam Settings",
    "Exam Navigation",
    "Exam Timer",
    "Exam Randomness",
    "Answer Key Settings",
];
export const calcState = (text) => {
    return text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        : EditorState.createEmpty();
}

export function createMarkup(html) {
    console.log("html =>", html)
    return {
        __html: DOMPurify.sanitize(html)
    }
}

export const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}