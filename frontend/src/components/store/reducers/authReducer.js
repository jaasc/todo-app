import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    name: null,
    email: null,
    _id: null
};

const authReducer = (user = initialState, action) => {
    switch (action.type){
        case "LOAD_USER":
        case "SIGN_IN":
        case "SIGN_UP":
            const userInfo = jwtDecode(action.token);
            return {
                ...initialState, 
                token: action.token,
                name: userInfo.name,
                email: userInfo.email,
                _id: userInfo._id
            };
        case "SIGN_OUT":
            toast.success("Signed out", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            localStorage.removeItem("token");
            return {
                token: localStorage.getItem("token"),
                name: null,
                email: null,
                _id: null
            };
        default:
            return user;
    };
};

export default authReducer;
