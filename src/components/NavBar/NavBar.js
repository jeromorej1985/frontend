import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth/Auth';

const navbar = (props) => {

    const signout = () => {
        auth0Client.signOut();
        props.history.replace('/');
    }

    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">Q&A App</Link>
            {
                !auth0Client.isAuthenticated() && 
                <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign in</button>
            }
            {
                auth0Client.isAuthenticated() &&
                <div>
                    <label className="mr-2  text-white">{auth0Client.getProfile().name}</label>
                    <button className="btn btn-dark" onClick={() => {signout()}}>Sign Out</button>
                </div>
            }
        </nav>
    );
}

export default withRouter(navbar);