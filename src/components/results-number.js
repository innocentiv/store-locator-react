import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    stores: state.stores,
});

const mapDispatchToProps = (dispatch) => ({
});


class ResultsNumber extends Component {
    render() {
        const {stores} = this.props;
        const numebrOfSelectedStores = stores.filter((store) => store.visible).length;
        let text = 'No store found, check che search query';
        
        switch (numebrOfSelectedStores) {
            case 1:
                text = '1 store found';
                break;
            
            default:
                text = `${numebrOfSelectedStores} stores found`;
                break;
        }

        return (<div className="resultsNumber">
            <div>{text}</div>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsNumber);