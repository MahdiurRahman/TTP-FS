export const loginUser = user => {
    // console.log(user)
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

export const updateSharesStore = shares => {
    // console.log(shares)
    return {
        type: "BUY_SELL_SHARES",
        payload: shares
    }
}

export const updatePortfolioValue = value => {
    return {
        type: "UPDATE_VALUE",
        payload: value
    }
}