export const loginUser = user => {
    console.log(user)
    return {
        type: "LOGIN_USER",
        payload: user
    }
}