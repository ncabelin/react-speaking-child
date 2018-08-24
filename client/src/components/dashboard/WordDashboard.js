import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllWords } from '../../actions/dataAction';

class WordDashboard extends Component {
  componentDidMount() {
    this.props.getAllWords();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Words Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

WordDashboard.propTypes = {
  getAllWords: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  words: state.words,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllWords })(WordDashboard);
