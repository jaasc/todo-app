export const url = "https://jtodo-app.herokuapp.com";

export const setHeaders = () => {
    const header = {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    }

    return header;
}