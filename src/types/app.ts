export interface IApp {
    listen: () => void;
    registerRoutes: () => void;
    registerMiddlewares: () => void;
}
