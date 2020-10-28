import { IApp } from "./app";
import { IAppRoute } from "./app-router";
import { Controller } from "./controller";
import { IRepository } from "./database";
import { IAppDependencies } from "./dependencies";

export type RepositoryResolver<Dependencies, Entity> = (dependencies: Dependencies) => IRepository<Entity>;

export type ControllerResolver<Dependencies, ActionNames extends string> = (dependencies: Dependencies) => Controller<ActionNames>;

export type RouterResolver<Dependencies> = (dependencies: Dependencies) => IAppRoute;

export type AppResolver = (dependencies: IAppDependencies) => IApp;