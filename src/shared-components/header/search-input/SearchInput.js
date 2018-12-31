import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import PropTypes from 'prop-types';

import './SearchInput.scss';

const { CancelToken } = axios;
const apiJobs = 'https://api.dataatwork.org/v1/';
const jobsUrls = {
  autocomplete: 'jobs/autocomplete',
  detail: 'jobs/'
};

const getSuggestionValue = (suggestion) => {
  axios.get(apiJobs + jobsUrls.detail + suggestion.uuid).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
  return suggestion.suggestion;
};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.suggestion}
  </div>
);


/**
 * Handle the Search Input page
 */
class Header extends Component {
  static propTypes = {
    classNameComponent: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  loadSuggestions = (value) => {
    if (value.length < 2) {
      return;
    }

    // Cancel the previous request
    if (this.lastRequestId) {
      this.lastRequestId.cancel('Operation canceled by the user.');
    }

    this.setState({
      isLoading: true
    });

    const cancelTokenSource = CancelToken.source();
    this.lastRequestId = cancelTokenSource;

    axios.get(apiJobs + jobsUrls.autocomplete, {
      params: {
        begins_with: value
      },
      cancelToken: cancelTokenSource.token
    }).then((response) => {
      const suggestions = response.data.slice(0, 10);
      this.setState({
        suggestions,
        isLoading: false
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        suggestions: [],
        isLoading: false
      });
    });
  }

  submitRequestSuggestions = (e) => {
    e.preventDefault();
    const autocomplete = e.target.elements.item('input.search_input');
    if (autocomplete) {
      this.loadSuggestions(autocomplete.value);
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onFocusInput = (e) => {
    e.target.classList.add('search__input--large');
  }

  onBlurInput = (e) => {
    e.target.classList.remove('search__input--large');
  }

  render() {
    const { classNameComponent } = this.props;
    const { value, suggestions, isLoading } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a Job',
      value,
      onChange: this.onChange,
      className: 'search__input',
      name: 'autocomplete',
      onFocus: this.onFocusInput,
      onBlur: this.onBlurInput
    };

    return (
      <form
        className={`search ${classNameComponent}`}
        onSubmit={this.submitRequestSuggestions}
      >
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <button type="submit">
          <i className={`fas ${!isLoading ? 'fa-search' : 'fa-spinner'}`} />
        </button>
      </form>
    );
  }
}

export default Header;
