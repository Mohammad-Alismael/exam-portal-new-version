import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ExamReducer from "./store/reducers/ExamReducer";
import UserReducer from "./store/reducers/UserReducer";
import ExamStudentReducer from "./store/reducers/ExamStudentReducer";
import CreateReducer from "./store/reducers/CreateReducer";
import UserReducerV2 from "./store/reducers/UserReducerV2";
import {BrowserRouter} from "react-router-dom";
const rootReducer = combineReducers({
    ExamReducer,
    UserReducer,
    UserReducerV2,
    ExamStudentReducer,
    CreateReducer
});

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('1store1', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('1store1');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => saveToLocalStorage(store.getState()));
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
