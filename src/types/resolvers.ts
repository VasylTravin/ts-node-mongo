import { IAppRoute } from "./app-router";
import { Controller } from "./controller";
import { IRepository } from "./database";

export type RepositoryResolver<Dependencies, Entity> = (dependencies: Dependencies) => IRepository<Entity>;

export type ControllerResolver<Dependencies, ActionNames extends string> = (dependencies: Dependencies) => Controller<ActionNames>;

export type RouterResolver<Dependencies> = (dependencies: Dependencies) => IAppRoute;