import ReactDOM from 'react-dom';
import './index.css';

// Authentication lib 
import Keycloak, { KeycloakOnLoad } from 'keycloak-js';
import jwt_decode from "jwt-decode";

// Main componenent
import App from './App';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './reducer/userReducer';

//services
import allService from './services/index'
import { User } from './components/domain/user/User';
const { userService } = allService;

let initOptions = {
    url: 'http://localhost:8080/auth', realm: 'nami', clientId: 'nami-app', onLoad: 'login-required' as KeycloakOnLoad
}

let keycloak = Keycloak(initOptions);

const store = createStore(userReducer);

keycloak.init({ onLoad: initOptions.onLoad }).then(async (auth) => {

    let user: User|null = null;

    if (!auth) {
        window.location.reload();
    } else {
        console.log("Keycloak Authenticated");

        var { email }: {email : string } = jwt_decode( keycloak.token!);
        
        const isUserAlreadyExists = await userService.exists(email);

        if(!isUserAlreadyExists) {
            console.log('Registration of user : '+ email);
            await userService.createUser({ email, pseudo: 'test'})
        }
        else {
            user = await userService.getUserByEmail(email);
        }
    }
    
    ReactDOM.render(
        <Provider store={store}>
            <App user={user}/>
        </Provider>,
        document.querySelector('#root')
    );

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