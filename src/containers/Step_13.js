import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash-es'
import { H1 } from '../components/styled/Layout'
import ServiceError from '../components/UI/ServiceError'
import globalAction from '../store/global/actions'

class StepThreeteen extends Component {
    state = {
        isLoading: false
    }

    componentDidMount() {
        //GoogleTagManager Events
        this.addGTM()
    }

    addGTM() {
        if (this.props.companyCode === "N11" && this.props.banner === "1") {
            //n11Banner
            window.dataLayer.push({
                'event': 'virtualPageview',
                'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step2olumsuz_banner/',
                'userId': this.props.transactionId
            });
        }
        else if (this.props.companyCode === "N11" && this.props.basketType === "4") {
            //n11 Oto Kredi
            window.dataLayer.push({
                'event': 'virtualPageview',
                'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step2olumsuz_n11oto/',
                'userId': this.props.transactionId
            });
        }
        else {
            window.dataLayer.push({
                'event': 'virtualPageview',
                'virtualPageURL': '/vp/fibabanka-alisveris-kredisi/step2olumsuz_checkout/',
                'userId': this.props.transactionId
            });
        }
    }

    render() {
        return (
            <Fragment>
                <H1></H1>

                <ServiceError {...this.props} />
            </Fragment>)
    }
}
const mapStateToProps = state => {
    return pick(state.global, ['failUrl', 'errorMessage', 'transactionId', 'companyCode', 'banner', 'basketType'])
}

const mapDispatchToProps = {
    informRedirection: globalAction('InformRedirectionFail')
}
export default connect(mapStateToProps, mapDispatchToProps)
(StepThreeteen)