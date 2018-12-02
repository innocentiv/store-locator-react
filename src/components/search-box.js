import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    updateSearchTermAction 
} from '../state/actions.js';

import SearchSuggestions from './search-suggestions.js';
import IconButton from './ui/icon-button.js';
import SearchIcon from './icons/search.js';
import RemoveIcon from './icons/remove.js';
import GeolocalizeIcon from './icons/geolocalize.js';


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    updateSearchTerm: (searchTerm) => dispatch(updateSearchTermAction(searchTerm)),
});

class SeachBox extends Component {
    render() {
        const {searchTerm} = this.props;

        return (
        <div className="SearchBox">
            <div className="searchInputAndButtons">
                <label htmlFor="searchInput" className="visuallyHidden">Cerca un negozio</label>
                <div className="searchInputAndIcons">
                    <SearchIcon/>
                    <div className="searchInput">
                        <input 
                            id="searchInput" 
                            type="text" 
                            placeholder="Inserisci una località" 
                            onInput={(ev) => this.handleInput(ev)}
                            value={searchTerm}
                        />
                        <SearchSuggestions/>
                    </div>
                    <IconButton
                        icon={RemoveIcon} 
                        label="clear search" 
                        clickHandler={(ev) => this.handleReset(ev)} 
                        cssclassName="clearSearch"
                    />
                </div>
                <IconButton
                    icon={GeolocalizeIcon} 
                    label="geolocate me" 
                    clickHandler={(ev => this.handleReset(ev))} 
                    cssclassName="btn geolocalizeIcon"
                />
            </div>
        </div>);
    }
    
    handleInput(ev) {
        this.props.updateSearchTerm(ev.target.value);
    }

    handleReset() {
        this.props.updateSearchTerm('');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeachBox);
