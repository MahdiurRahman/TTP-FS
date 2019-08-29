import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import {updateSharesStore, loginUser, updatePortfolioValue} from '../actions'

class PurchaseShares extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbol: '',
            quantity: 0
        }
    }

    onChangeHandler = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = async event => {
        event.preventDefault()
        console.log("PURCHASESHARES: onSubmitHandler", this.state)

        // Make IEX-Api call
        const stockQuote = await axios.get("https://cloud.iexapis.com/stable/stock/" + this.state.symbol + "/quote?token=pk_11c90fe47d2a45778fc45e8f01f27e4d")

        // Check if IEX-Api call is valid
        if (stockQuote.status == 200) {

            let newShares = {};
            newShares.symbol = stockQuote.data.symbol
            newShares.quantity = this.state.quantity
            newShares.price = stockQuote.data.latestPrice

            const updateServer = await axios.post("http://localhost:5000/api/users/" + this.props.user.id + "/buy", newShares)
            
            if (updateServer.status === 200) {

                const updatedUser = await axios.get("http://localhost:5000/api/users/" + this.props.user.id)
                this.props.loginUser(updatedUser.data)

                await this.updateShares()
                
                let sum = 0
                for (let i = 0; i < this.props.shares.length; i++) {
                    sum += (this.props.shares[i].price * this.props.shares[i].quantity)
                }
                this.props.updatePortfolioValue(sum)
            }
            else {
                // Error message
            }
        }
        else {
            // Error message
        }
    }

    updateShares = async () => {
        const databaseShares = await axios.get("http://localhost:5000/api/users/" + this.props.user.id + "/shares")

        let storeShares = databaseShares.data

        for (let i = 0; i < storeShares.length; i++) {
            const stockQuote = await axios.get("https://cloud.iexapis.com/stable/stock/" + storeShares[i].symbol + "/quote?token=pk_11c90fe47d2a45778fc45e8f01f27e4d")
            console.log(stockQuote)
            storeShares[i].open = stockQuote.data.open
            storeShares[i].price = stockQuote.data.latestPrice
        }
        this.props.updateSharesStore(storeShares)
    }

    render() {
        return (
            <div>
                <h2>cash - ${this.props.user.balance}</h2>
                <form onSubmit={this.onSubmitHandler}>
                    <input name="symbol" type="text" placeholder="Ticker" onChange={this.onChangeHandler} />
                    <input name="quantity" type="number" placeholder="Qty" onChange={this.onChangeHandler} />
                    <button type="submit">buy</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        shares: state.shares,
        portfolio: state.portfolio
    }
}

export default connect(mapStateToProps, {
    updateSharesStore,
    loginUser,
    updatePortfolioValue
})(PurchaseShares)