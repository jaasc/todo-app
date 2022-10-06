export const url = "https://todo-app-jaasc.vercel.app";

export const setHeaders = () => {
    const header = {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    }

    return header;
}