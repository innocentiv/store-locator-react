import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    openStoreDetailsAction,
} from '../state/actions.js';
import RightArrow from './icons/arrowRight.js';
import PhoneIcon from './icons/phone.js';

const mapStateToProps = (state) => ({
    stores: state.stores,
});

const mapDispatchToProps = (dispatch) => ({
    openStoreDetails: (store) => dispatch(openStoreDetailsAction(store))
});

class StoresList extends Component {
    render() {
        const {stores, openStoreDetails} = this.props;
        const liStyle = (index) => ({
            borderTop: index === 0 ? ': solid 1px lightgray' : 'none',
            borderBottom: 'solid 1px lightgray',
            padding: '1em 0',
            display: 'flex',
            justifyContent: 'space-between'
        });
        
        return (<ul className="storesList">
                {stores
                    .filter((store) => store.visible)
                    .map((store, i) => 
                        <li key={i} style={liStyle(i)} onClick={() => openStoreDetails(store)}>
                            <div>
                                <div className="storeName">{store.name}</div>
                                <div className="storePhone">
                                    <span className="icon"><PhoneIcon/></span>
                                    <span className="text">{store.phone}</span>
                                </div>
                            </div>
                            <div>
                                <RightArrow />
                            </div>
                    </li>)}
            </ul>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoresList);