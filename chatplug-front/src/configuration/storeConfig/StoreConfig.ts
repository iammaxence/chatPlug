import { createStore } from 'redux';
import userReducer from '../../reducer/userReducer';

export class StoreConfig {

    static initialise() {
        return createStore(userReducer);
    }
}