import {convertFromRaw, EditorState} from "draft-js";
import DOMPurify from "dompurify";

export const UNDERGRAD_STUDENT_ROLE = [1]
export const GRAD_STUDENT_ROLE = [2]
export const INSTRUCTOR_ROLE = [3]
export const STUDENT_ROLES = [1,2]
export const ALL_ROLES = [1,2,3]

export const calcState = (text) => {
    return text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        : EditorState.createEmpty();
}

export function createMarkup(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}