import React, { Component } from 'react';
import SearchInput from './search-input/SearchInput';
import './Header.scss';
// TODO Use the Sass in case to extend and use just the necessary class
import '@fortawesome/fontawesome-free/css/all.min.css';

/**
 * Handle the Header page
 */
class Header extends Component {
  /**
  * OnSubmit function
  */
  onIconClick = () => {
    console.log('User');
  }

  render() {
    return (
      <div className="header">
        <div className="header__menu">
          <div className="header__menu__title">
            Start Bootstrap Menu
          </div>

          <i className="fas fa-bars header__menu__bars" />
        </div>

        <div className="header__widgets">
          <SearchInput classNameComponent="header__widgets__search" />
          <button type="button" onClick={this.onIconClick}>
            <i className="fa fa-bell" />
          </button>
          <button type="button" onClick={this.onIconClick}>
            <i className="fas fa-envelope" />
          </button>
          <button type="button" onClick={this.onIconClick}>
            <i className="fas fa-user" />
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
