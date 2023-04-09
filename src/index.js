import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ExamReducer from "./store/reducers/ExamReducer";
import ExamStudentReducer from "./store/reducers/ExamStudentReducer";
import CreateReducer from "./store/reducers/CreateReducer";
import UserReducer from "./store/reducers/UserReducer";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import CourseReducer from "./store/reducers/CourseReducer";
import AddQuestionReducer from "./store/reducers/AddQuestionReducer";
import SubmissionsReducer from "./store/reducers/SubmissionsReducer";
import CreateNewCourseReducer from "./store/reducers/CreateNewCourseReducer";
import CourseListReducer from "./store/reducers/CourseListReducer";
import SidebarReducer from "./store/reducers/SidebarReducer";
import { parse, stringify, toJSON } from "flatted";
import { persistReducer, persistStore, createMigrate } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {PersistGate} from "redux-persist/integration/react"; // defaults to localStorage for web

const rootReducer = combineReducers({
  ExamReducer,
  AddQuestionReducer,
  UserReducerV2: UserReducer,
  ExamStudentReducer,
  SubmissionsReducer,
  CreateReducer,
  CourseReducer,
  CourseListReducer,
  CreateNewCourseReducer,
  SidebarReducer,
});

const flattenSerializer = {
    serialize: (data) => stringify(data),
    deserialize: (serializedData) => parse(serializedData),
};
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    serialize: flattenSerializer,
    deserialize: flattenSerializer,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

store.subscribe(() => {
  const obj = store.getState();
  // saveToLocalStorage(obj);
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
