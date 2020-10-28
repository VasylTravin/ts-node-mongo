import { Router } from "express";
import { IUserRouterDependencies } from "../types/dependencies";
import { RouterResolver } from "../types/resolvers";

export const userRouter: RouterResolver<IUserRouterDependencies> = (dependencies) => {
    const router = Router();
    const { userController } = dependencies;
    const path = "/user";

    router.get("/", userController.GET_USER);
    router.post("/", userController.CREATE_USER);

    return { path, router };
}