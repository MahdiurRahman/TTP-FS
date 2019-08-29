import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateSharesStore} from '../actions'
import {Link} from 'react-router-dom'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            portfolio: 0
        }
    }

    async componentDidMount() {
        console.log("PORTFOLIO: componentDidMount", this.props.user)

        // Set up the IEX-Api call to occur every minute
        this.IEXApiCall = setInterval(async () => {
            const databaseShares = await axios.get("http://localhost:5000/api/users/" + this.props.user.id + "/shares")
            this.updateShares(databaseShares.data)
        }, 60000)
    }

    updateShares = async databaseShares => {
        let storeShares = databaseShares
        for (let i = 0; i < storeShares.length; i++) {
            const stockQuote = await axios.get("https://cloud.iexapis.com/stable/stock/" + storeShares[i].symbol + "/quote?token=pk_11c90fe47d2a45778fc45e8f01f27e4d")
            console.log(stockQuote)
            storeShares[i].open = stockQuote.data.open
            storeShares[i].latestPrice = stockQuote.data.latestPrice
        }
        this.props.updateSharesStore(storeShares)

        this.computePortfolioValue()
    }

    computePortfolioValue = () => {
        // Reset Portfolio
        this.setState({
            portfolio: 0
        })

        // Iterate through shares in store and sum
        for (let i = 0; i < this.props.shares.length; i++) {
            // Multiply share price by quantity
            const addition = this.props.shares[i].latestPrice * this.props.shares[i].quantity

            // Sum to portfolio
            this.setState({
                portfolio: this.state.portfolio + addition
            })
        }
    }

    render() {
        return (
            <div>
                <h2>Welcome, {this.props.user.firstName}</h2>
                <h2>Portfolio: {this.state.portfolio}</h2>
                {
                    this.props.shares.map(share => {
                        return (
                            <div>
                                <h3>{share.symbol}</h3>
                                <h3>{share.quantity}</h3>
                                <h3>{share.open}</h3>
                                <h3>{share.latestPrice}</h3>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        shares: state.shares
    }
}

export default connect(mapStateToProps, {
    updateSharesStore
})(Portfolio)