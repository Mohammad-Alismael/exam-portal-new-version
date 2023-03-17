import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ExamReducer from "./store/reducers/ExamReducer";
import ExamStudentReducer from "./store/reducers/ExamStudentReducer";
import CreateReducer from "./store/reducers/CreateReducer";
import UserReducerV2 from "./store/reducers/UserReducerV2";
import {BrowserRouter} from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import CourseReducer from "./store/reducers/CourseReducer";
import AddQuestionReducer from "./store/reducers/AddQuestionReducer";
import SubmissionsReducer from "./store/reducers/SubmissionsReducer";
import CreateNewCourseReducer from "./store/reducers/CreateNewCourseReducer";
import CourseListReducer from "./store/reducers/CourseListReducer";
import SidebarReducer from "./store/reducers/SidebarReducer";
const rootReducer = combineReducers({
    ExamReducer,
    AddQuestionReducer,
    UserReducerV2,
    ExamStudentReducer,
    SubmissionsReducer,
    CreateReducer,
    CourseReducer,
    CourseListReducer,
    CreateNewCourseReducer,
    SidebarReducer
});

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        sessionStorage.setItem('1store1', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = sessionStorage.getItem('1store1');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(() => {
    const obj = store.getState()
    // delete obj['TokenReducer']
    saveToLocalStorage(obj)
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
