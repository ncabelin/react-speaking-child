import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="">Child: {user.childname}</a></li>
        <li><Link to="/word-dashboard" className="">Words</Link></li>
        <li><Link to="/phrase-dashboard" className="">Phrases</Link></li>
        <li><a href="" onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
      </ul>
    )
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Sign in</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    )

    return (
        <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to="/"><img src="https://res.cloudinary.com/dd6kwd0zn/image/upload/v1535007460/speakingchild_logo2_pkywq6.png" className="navbar-brand logo" alt="" /></Link>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                { isAuthenticated ? authLinks : guestLinks }
              </div>
            </div>
        </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
