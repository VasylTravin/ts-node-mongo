import { PromiseWithChild } from "child_process";

export interface IDatabaseManager {
    connectionString?: string;
    connect: () => Promise<void>
    dispose: () => Promise<void>
}

export interface IRepository<Entity> {
    get: () => Promise<Entity[]>;
    create: (entity: Entity) => Promise<Entity>;
    update: (entity: Entity) => Promise<Entity>;
}