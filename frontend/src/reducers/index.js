import {combineReducers} from 'redux'

// User reducer
const userReducer = (oldUser = {}, action) => {
    // console.log(action)
    switch (action.type) {
        case "LOGIN_USER":
            return action.payload
        case "LOGOUT_USER":
            return {}
        default:
            return oldUser
    }
}

// Shares reducer
const sharesReducer = (oldShares = [], action) => {
    switch (action.type) {
        case "BUY_SELL_SHARES":
            return action.payload
        default:
            return oldShares
    }
}

// Tansactions reducer
const transactionsReducer = (oldTransactions = [], action) => {
    switch (action.type) {
        case "NEW_TRANSACTION":
            return action.payload
        default:
            return oldTransactions
    }
}

// Portfolio Value reducer
const portfolioReducer = (oldPortfolioValue = 0, action) => {
    switch (action.type) {
        case "UPDATE_VALUE":
            return action.payload
        default:
            return oldPortfolioValue
    }
}

// Combine reducers
export default combineReducers({
    user: userReducer,
    shares: sharesReducer,
    transactions: transactionsReducer,
    portfolio: portfolioReducer
})