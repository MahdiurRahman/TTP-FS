import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateSharesStore, updatePortfolioValue, updateTransactions} from '../actions'
import {Link} from 'react-router-dom'

// Sub-Components
import PurchaseShares from './PurchaseShares'

class Portfolio extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        console.log("PORTFOLIO: componentDidMount", this.props.user)

        // First initial IEX-Api call
        const databaseShares = await axios.get("http://localhost:5000/api/users/" + this.props.user.id + "/shares")
        this.updateShares(databaseShares.data)

        // Then, set up the IEX-Api call to occur every minute
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
            storeShares[i].price = stockQuote.data.latestPrice
        }
        this.props.updateSharesStore(storeShares)

        this.computePortfolioValue()
    }

    computePortfolioValue = () => {
        // Iterate through shares in store and sum
        let sum = 0
        for (let i = 0; i < this.props.shares.length; i++) {
            sum += (this.props.shares[i].price * this.props.shares[i].quantity)
        }
        this.props.updatePortfolioValue(sum)
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <h1>welcome, {this.props.user.firstName}</h1>
                        <h2>portfolio (${this.props.portfolio})</h2>
                    </div>
                    <div>
                        <Link to="/"><button>Portfolio</button></Link>
                        <Link to="/transactions"><button>Transactions</button></Link>
                    </div>
                </div>
                <PurchaseShares computePortfolioValue={this.computePortfolioValue} />
                <div>
                    {this.props.shares.map(share => {
                        return (
                            <div>
                                <h3>{share.symbol}</h3>
                                <h3>shares: {share.quantity}</h3>
                                <h3>open: ${share.open}</h3>
                                <h3>price: ${share.price}</h3>
                            </div>
                        )
                    })}
                </div>
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
    updatePortfolioValue,
    updateTransactions
})(Portfolio)