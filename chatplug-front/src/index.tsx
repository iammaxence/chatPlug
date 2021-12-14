import ReactDOM from 'react-dom';

// Authentication lib 
import Keycloak, { KeycloakOnLoad } from 'keycloak-js';
import jwt_decode from "jwt-decode";

// Main componenent
import App from './App';

//services
import allService from './services/index'
const { userService } = allService;

let initOptions = {
    url: 'http://localhost:8080/auth', realm: 'nami', clientId: 'nami-app', onLoad: 'login-required' as KeycloakOnLoad
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.log("Authenticated");
        var { email }: {email : String } = jwt_decode( keycloak.token!);
        
        // check email exist

        //else
        userService.createUser({ email, pseudo: 'test'})
    }
    
    // I need to pass token here to register user
    ReactDOM.render(<App />, document.querySelector('#root'));

    localStorage.setItem("react-token", keycloak.token!);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken!);

    setTimeout(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed!.exp! + keycloak.timeSkew! - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch((error) => {
            console.error('Failed to refresh token : ', error);
        });


    }, 60000)

}).catch((error) => {
    console.error("Authenticated Failed : ", error);
});