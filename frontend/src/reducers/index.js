import {combineReducers} from 'redux'

// User reducer
const userReducer = (oldUser = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
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

// Combine reducers
export default combineReducers({
    user: userReducer,
    shares: sharesReducer,
    transactions: transactionsReducer
})