import { AppResolver } from "./types/app";
import { Server } from "http";

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