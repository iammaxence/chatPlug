import Keycloak, { KeycloakOnLoad } from 'keycloak-js';

export class KeycloakConfig {
    static initOptions = {
        url: 'http://localhost:8080/auth', realm: 'nami', clientId: 'nami-app', onLoad: 'login-required' as KeycloakOnLoad
    }
    
    static initialise() {
        return Keycloak(this.initOptions);
    }
}