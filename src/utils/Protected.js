import {Navigate, useNavigate,useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Protected = ({children, onlyAccessTo}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.UserReducerV2).user;
    const roles = onlyAccessTo.includes(parseInt(user?.role_id))
    if (user == null) {
        return <Navigate to="/" replace state={{ path: location.pathname }}/>;
    }
    if (!roles){
        return <p style={{color: 'white'}}>you don't have access</p>;
    }
    return children;
};
export default Protected;
