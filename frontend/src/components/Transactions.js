import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {updateTransactions} from '../actions'

class Transactions extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        console.log("TRANSACTIONS: componentDidMount")
        const transactions = await axios.get("http://localhost:5000/api/users/" + this.props.user.id + "/transactions")
        this.props.updateTransactions(transactions.data)
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Your transaction history:</h1>
                    <div>
                        <Link to="/"><button>Portfolio</button></Link>
                        <Link to="/transactions"><button>Transactions</button></Link>
                    </div>
                </div>
                <div>
                    {this.props.transactions.reverse().map(transaction => {
                        return (
                            <div>
                                <h3>{transaction.buy ? "BUY" : "SELL"} : {transaction.symbol} - qty {transaction.quantity} x ${transaction.price} (balance: ${transaction.balance}) | <span>{transaction.month}/{transaction.day}/{transaction.year}</span></h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user,
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, {
    updateTransactions
})(Transactions)