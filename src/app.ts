import { Server } from "http";
import { AppResolver } from "./types/resolvers";

export const app: AppResolver = (dependencies) => {
    const { appRoutes, server, port, middlewares } = dependencies;

    const listen = (): Server => server.listen(port);

    const registerMiddlewares = () => {
        middlewares.forEach(middleware => {
            server.use(middleware);
        })
    }
    const registerRoutes = () => {
        appRoutes.forEach(route => {
            server.use(route.path, route.router);
        })
    };

    return { listen, registerRoutes, registerMiddlewares }
}