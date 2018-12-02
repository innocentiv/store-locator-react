import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    updateSearchTermAction,
} from '../state/actions.js';

const mapStateToProps = (state) => ({
    searchTerm: state.searchTerm,
    locations: state.locations,
});

const mapDispatchToProps = (dispatch) => ({
    updateSearchTerm: (suggestion) => dispatch(updateSearchTermAction(suggestion)),
});

class SearchSuggestions extends Component {
    constructor(props) {
        super(props);
        this.oldSuggestions = [];
    }
    
    render() {
        const {searchTerm, locations, updateSearchTerm} = this.props;
        const suggestions = searchTerm.length > 2 ? locations.filter((location) => location.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];
        const thereAreSuggestions = Boolean(suggestions.length);
        const suggestionsToRender = thereAreSuggestions ? suggestions : this.oldSuggestions;
        this.oldSuggestions = suggestions;
        
        return (<ul style={{display: `${thereAreSuggestions ? 'block' : 'none'}`}}>
                {suggestionsToRender
                    .map((suggestion, i) => 
                        <li key={i} onClick={() => updateSearchTerm(suggestion.name)}>{suggestion.name}</li>
                    )}
            </ul>);
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSuggestions);