import { MongoDbContext } from "../database/db-context";
import { Controller } from "./controller";
import { IRepository } from "./database";
import { UserContollerActions } from "./enums";
import { IAppRoute } from "./app-router";
import { IUser } from "./user";
import express from "express";

export interface IDbContextDependencies {
    connectionString: string | undefined;
}

export interface IUserRepositoryDependencies {
    dbContext: MongoDbContext;
}

export interface IUserControllerDependencies {
    userRepository: IRepository<IUser>;
}

export interface IUserRouterDependencies {
    userController: Controller<UserContollerActions>
}

export interface IAppDependencies {
    server: express.Application;
    port: number;
    appRoutes: IAppRoute[];
    middlewares: express.RequestHandler[];
}