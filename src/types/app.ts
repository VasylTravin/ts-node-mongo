import { IAppDependencies } from "./dependencies";

export interface IApp {
    listen: () => void;
    registerRoutes: () => void;
}

export type AppResolver = (dependencies: IAppDependencies) => IApp;