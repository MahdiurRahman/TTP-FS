import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateShares} from '../actions'
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
        const shares = await axios.get("http://localhost:5000/api/users/" + this.props.user.id + "/shares")
        this.props.updateShares(shares.data)
        // this.computePortfolio(this.props.shares)
    }

    computePortfolio = async shares => {
        // https://sandbox.iexapis.com/stable/stock/SNAP/quote?token=Tpk_c992f1040edb403ab549c3ce37cae445

        for (let i = 0; i < this.props.shares.length; i++) {
            const stockQuote = await axios.get("https://sandbox.iexapis.com/stable/stock/" + this.props.shares[i].symbol + "/quote?token=Tpk_c992f1040edb403ab549c3ce37cae445")
            console.log(stockQuote)
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
    updateShares
})(Portfolio)