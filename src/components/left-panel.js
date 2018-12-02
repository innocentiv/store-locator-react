import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSearchLayerAction } from '../state/actions.js';

import SearchBox from './search-box';
import ResultsNumber from './results-number';
import FilterPanel from './filter-panel';
import StoresList from './stores-list';
import StoreDetails from './store-details';

const mapStateToProps = (state) => ({
    searchLayerOpen: state.ui.searchLayerOpen,
});

const mapDispatchToProps = (dispatch) => ({
    toggleSearchLayer: () => dispatch(toggleSearchLayerAction()),
});

class LeftPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touchStart: 0,
        }
    }

    render() {
        const {toggleSearchLayer, searchLayerOpen} = this.props;

        return (
            <div 
                className={`leftPanel ${searchLayerOpen ? 'open' : ''}`} 
                onTouchStart={(ev) => this.setState({touchStart: ev.touches[0].clientX})}
                onTouchEnd={(ev) => {
                    if (this.state.touchStart - ev.changedTouches[0].clientX > 100) {
                        toggleSearchLayer();
                    }
                }}
            >
                <SearchBox/>
                <ResultsNumber/>
                <FilterPanel/>
                <div className="storesAndStoreDetails">
                    <StoresList/>
                    <StoreDetails/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
