import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSearchLayerAction } from '../state/actions.js';
import SearchIcon from './icons/search.js';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    toggleSearchLayer: () => dispatch(toggleSearchLayerAction()),
});

class SearchOpener extends Component {
    render() {
        const {toggleSearchLayer} = this.props;

        return (<button className="searchOpener" onClick={() => toggleSearchLayer()}>
            <span className="icon"><SearchIcon /></span>
            <span className="text visuallyHidden">Search</span>
        </button>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOpener);