import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      childname: '',
      email: '',
      password: '',
      password2: '',
      birthday: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      childname: this.state.childname,
      email: this.state.email,
      password: this.state.password,
      birthday: this.state.birthday,
      password2: this.state.password2
    }
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h1 className="display-4 text-center">Register</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Child Name"
                  name="childname"
                  value={this.state.childname}
                  error={errors.name}
                  type="text"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Birthday MM/DD/YYYY"
                  name="birthday"
                  value={this.state.birthday}
                  error={errors.birthday}
                  type="text"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
