import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    openStoreDetailsAction,
} from '../state/actions.js';

import LeftArrow from './icons/leftArrow.js';
import PhoneIcon from './icons/phone.js';
import MailIcon from './icons/mail.js';


const mapStateToProps = (state) => ({
    store: state.openedStore,
});

const mapDispatchToProps = (dispatch) => ({
    closeStoreDetails: () => dispatch(openStoreDetailsAction(null))
});

const RenderStore = ({store}) => (<div className="store">
            <div className="store_name">{store.name}</div>
            <div className="store_phone">
                <span className="icon"><PhoneIcon/></span>
                <span className="text">{store.phone}</span>
            </div>
            <div className="store_mail">
                <span className="icon"><MailIcon/></span>
                <span className="text"><a href={`mailto:${store.mail}`}>{store.mail}</a></span>
            </div>
            <div className="store_categoriesTitle">Store categories</div>
            <ul className="store_categories">
                {store.productCategory.map((category, i) => <li key={i}>{category.name}</li>)}
            </ul>
            <div className="store_servicesTitle">Store services</div>
            <ul className="store_services">
                {store.hasMadeToMeasure ? <li>Made to measure</li> : null}
                {store.hasTailoring ? <li>Tailoring</li> : null}
                {store.gifCardAccepted ? <li>Gift card accepted</li> : null}
                {store.hasWiFi ? <li>Wi-Fi</li> : null}
                {store.reserveInStore ? <li>Reserve in store</li> : null}
                {store.pickUpInStore ? <li>Pick-up in store</li> : null}
                {store.returnInStore ? <li>Return in store</li> : null}
                {store.clickFromStore ? <li>Click from store</li> : null}
                {store.bookable ? <li>Bookable</li> : null}
            </ul>
        </div>
);

class StoreDetails extends Component {
    render() {
        const {store} = this.props;
        
        return(<div className={`storeDetails ${Boolean(store) ? 'slide-in-left' : 'slide-out-right'}`}>
                <button className="backButton" onClick={() => this.props.closeStoreDetails()}>
                    <span className="backIcon"><LeftArrow/></span>
                    <span className="text">close</span>
                </button>
                {store ? <RenderStore store={store} /> : null}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
