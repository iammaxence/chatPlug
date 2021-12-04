import config from './config';
import setupModels from './application/db/setup/ModelAssociation';
import { ExpressConfiguration } from "./runtime/configuration/expressConfiguration";
import { RouteConfiguration } from "./runtime/configuration/routeConfiguration";
import { SocketIoConfiguration } from "./runtime/configuration/socketIoConfiguration";

const expressConfiguration = new ExpressConfiguration();
const app = expressConfiguration.initialise();

const { instanceSequelize } = setupModels; 
instanceSequelize.sync();

const routeConfiguration = new RouteConfiguration(app);
routeConfiguration.initalise();

const server = app.listen(config.port, () =>  console.log('ChatPlug server is running on port : ', config.port));

/* I need to separate the call api from the configuration */
const socketIoConfiguration = new SocketIoConfiguration(server);
socketIoConfiguration.initialise();