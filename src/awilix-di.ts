import express from "express";
import { createContainer, asFunction, AwilixContainer } from "awilix";
import dotenv from "dotenv";
import { app } from "./app";
import { userController } from "./controllers/user-controller";
import { dbContext } from "./database/db-context";
import { userRepository } from "./database/user-repository";
import { userRouter } from "./routers/user-router";
import { IAppRoute } from "./types/app-router";

dotenv.config();

export const DB_CONTEXT_INJECTOR = "dbContext";

// repositories
export const USER_REPOSITORY_INJECTOR = "userRepository";

// controllers
export const USER_CONTROLLER_INJECTOR = "userController";

// routers
export const USER_ROUTER_INJECTOR = "userRouter";

// app
export const APP_INJECTOR = "app";

export const createAppContainer = (): AwilixContainer => {
    const container = createContainer();

    const connectionString = process.env.CONNECTION_STRING;
    const server = express();

    container.register({
        [DB_CONTEXT_INJECTOR]: asFunction(dbContext).inject(() => ({ connectionString })).singleton(),
        // repositories
        [USER_REPOSITORY_INJECTOR]: asFunction(userRepository).scoped(),
        // controllers
        [USER_CONTROLLER_INJECTOR]: asFunction(userController).scoped(),
        // routers
        [USER_ROUTER_INJECTOR]: asFunction(userRouter).scoped(),
        // root app
        [APP_INJECTOR]: asFunction(app).inject(() => ({
            server: server,
            port: 4000,
            appRoutes: [
                container.resolve<IAppRoute>(USER_ROUTER_INJECTOR)
            ],
            middlewares: [
                express.json()
            ]
        }))
    });

    return container;
}
