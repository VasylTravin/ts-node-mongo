import { Server } from "http";
import { AppResolver } from "./types/resolvers";

export const app: AppResolver = (dependencies) => {
    const { appRoutes, server, port } = dependencies;

    const listen = (): Server => server.listen(port);

    const registerRoutes = () => {
        appRoutes.forEach(route => {
            server.use(route.path, route.router);
        })
    };

    return { listen, registerRoutes }
}