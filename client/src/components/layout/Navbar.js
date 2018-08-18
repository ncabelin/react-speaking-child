import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
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
              <Link to="/"><img src="speakingchild_logo2.png" className="navbar-brand logo" alt="" /></Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/" className="ng-binding">Child: </Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/">Logout</Link></li>
              </ul>
            </div>
          </div>
      </nav>
  )
}
