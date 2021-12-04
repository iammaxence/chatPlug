import {Application } from "express";
import express from 'express';
import cors from 'cors';

export class ExpressConfiguration {
    private app: Application;

    constructor() {
        this.app = express();
    }

    initialise() {
        this.app.use(cors());
        this.app.options('*', cors); 
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json())
        return this.app;
    }
}