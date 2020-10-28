import { APP_INJECTOR, createAppContainer, DB_CONTEXT_INJECTOR } from "./awilix-di";
import { MongoDbContext } from "./database/db-context";
import { IApp } from "./types/app";

const appContainer = createAppContainer();

const app = appContainer.resolve<IApp>(APP_INJECTOR);
const dbContext = appContainer.resolve<MongoDbContext>(DB_CONTEXT_INJECTOR);

dbContext.connect();

app.registerRoutes();

app.listen();

const appCleanUp = async () => {
    await dbContext.dispose();

    process.exit(0);
}

process.on('SIGINT', appCleanUp)
    .on('SIGTERM', appCleanUp);
