import axios from "axios";
import { url } from "../../../api";
import { toast } from "react-toastify";

export const signUp = (user) => {
    return (dispatch) => {
        axios
            .post(`${url}/signup`, user)
            .then((token) => {
                localStorage.setItem("token", token.data);
                dispatch({
                    type: "SIGN_UP", 
                    token: token.data
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const loadUser = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (token) {
            dispatch({
                type: "LOAD_USER",
                token
            });
        } else return null;
    };
};

export const signIn = (user) => {
    return (dispatch) => {
        axios
            .post(`${url}/signin`, user)
            .then((token) => {
                localStorage.setItem("token", token.data);
                dispatch({
                    type: "SIGN_IN", 
                    token: token.data
                })
            })
            .catch((e) => {
                console.log(e.response);
                toast.error(e.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    };
};

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: "SIGN_OUT"
        })
    };
};
