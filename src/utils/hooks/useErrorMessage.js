import { useState } from "react";

const useErrorMessage = () => {
    const [showError, setShowError] = useState(false);
    const [showMsg, setShowMsg] = useState("");
    const [showErrorSection, setShowErrorSection] = useState(false);
    const [showMsgSection, setShowMsgSection] = useState("");

    const showErrorMsg = (msg) => {
        setShowError(true);
        setShowMsg(msg);
    };

    const showErrorSectionMsg = (msg) => {
        setShowErrorSection(true);
        setShowMsgSection(msg);
    };

    const hideErrorMsg = () => {
        setShowError(false);
        setShowMsg("");
    };

    const hideErrorSectionMsg = () => {
        setShowErrorSection(false);
        setShowMsgSection("");
    };

    return {
        showError,
        showMsg,
        showErrorSection,
        showMsgSection,
        showErrorMsg,
        showErrorSectionMsg,
        hideErrorMsg,
        hideErrorSectionMsg,
    };
};

export default useErrorMessage;
