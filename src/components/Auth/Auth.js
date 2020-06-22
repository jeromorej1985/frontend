import auth0 from 'auth0-js';

const CLIENTID = 'pbkrA6U9YLYGBZ4Q9r5K2mx6eeuQeOOc';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'dev-dhaxmdk0.us.auth0.com',
            audience: 'https://dev-dhaxmdk0.us.auth0.com/userinfo',
            clientID: CLIENTID,
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'id_token',
            scope: 'openid profile'
        });
       
    }

    getProfile = () => {
        return this.profile;
    }

    getIdToken = () => {
        return this.idToken;
    }

    isAuthenticated = () => {
        return new Date().getTime() < this.expiresAt;
    }

    signIn = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if(!authResult || !authResult.idToken) {
                    return reject(err);
                }

                this.setSession(authResult);
                resolve();
            });
        })
    }

    setSession = (authResult) => {
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;

        // set the time the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    signOut = () => {
        this.auth0.logout({
            returnTo: 'http://localhost:3000',
            clientID: CLIENTID,
        });
    }

    silentAuth = () => {
        return new Promise((resolve, reject) => {
            this.auth0.checkSession({}, (err, authResult)=> {
                if (err) return reject(err);
                this.setSession(authResult);
                resolve();
            });
        });
    }
    
}

const auto0Client = new Auth();

export default auto0Client;