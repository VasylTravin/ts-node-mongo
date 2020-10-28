import database from "mongoose";
import { IDbContextDependencies } from "../types/dependencies";
import { UserEntity } from "./schemas";

export const dbContext = (dependencies: IDbContextDependencies) => {
    const { connectionString } = dependencies;

    const connect = async (): Promise<void | never> => {

        if (!connectionString) {
            throw new Error("Connection string is missing!")
        }

        await database.connect(connectionString,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }, () => console.log('connected'));
    }

    const dispose = async (): Promise<void> => {
        database.disconnect(() => console.log('disconnected'));
    }

    return { connect, dispose, userEntity: UserEntity };
}

export type MongoDbContext = ReturnType<typeof dbContext>;