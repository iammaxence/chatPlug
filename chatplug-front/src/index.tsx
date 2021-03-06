import ReactDOM from 'react-dom';
import './index.css';

// Keycloak
import { KeycloakConfig } from './configuration/keycloak/KeycloakConfig';

// Authentication lib 
import jwt_decode from "jwt-decode";

// Main componenent
import ChatPlug from './ChatPlug';

//redux
import { Provider } from 'react-redux';
import { StoreConfig } from './configuration/storeConfig/StoreConfig';

//services
import allService from './services/index'
import { User } from './components/domain/user/User';
const { userService } = allService;

const keycloak = KeycloakConfig.initialise();

const store = StoreConfig.initialise();

const initialiseUser = async (token: string) => {
    var { email }: {email : string } = jwt_decode( token );
        
    const isUserAlreadyExists = await userService.exists(email);

    if(!isUserAlreadyExists) {
        console.log('Registration of user : '+ email);
        return userService.createUser({ email, pseudo: 'test'})
    }
    else {
       return userService.getUserByEmail(email);
    }
}

keycloak.init({ onLoad: KeycloakConfig.initOptions.onLoad }).then(async (auth) => {

    let user: User|null = null;

    if (!auth)
        window.location.reload();
   
    console.log("Keycloak Authenticated");
    user = await initialiseUser( keycloak.token as string );

    ReactDOM.render(
        <Provider store={store}>
            <ChatPlug user={user}/>
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