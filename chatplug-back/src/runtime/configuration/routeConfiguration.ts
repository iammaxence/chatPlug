import { Application } from "express";
import allRoutes from '../../application/routes/allRoutes';

export class RouteConfiguration {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    initalise() {
        this.app.use('/user', allRoutes.userRoutes);
        this.app.use('/message', allRoutes.messageRoutes);
        this.app.use('/room', allRoutes.roomRoutes);
    }
}