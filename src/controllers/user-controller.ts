import express from "express";
import { IUser } from "../types/user";
import { IUserControllerDependencies } from "../types/dependencies";
import { UserContollerActions } from "../types/enums";
import { ControllerResolver } from "../types/resolvers";

export const userController: ControllerResolver<IUserControllerDependencies, UserContollerActions> = (dependencies) => {
    const { userRepository } = dependencies;

    const getUser = async (req: express.Request, res: express.Response): Promise<any> => {
        try {
            const users = await userRepository.get();

            if (!users.some(u => u))
                return res.status(404).send("No users have been found!");

            res.json(users);
        } catch (error) {
            var err: Error = error;

            res.status(500).send(err.message);
        }
    }

    const createUser = async (req: express.Request, res: express.Response): Promise<any> => {
        const newUser: IUser = req.body;

        try {
            const createdUser = await userRepository.create(newUser);

            res.json(createdUser);
        } catch (error) {
            var err: Error = error;

            res.status(500).send(err.message);
        }
    }

    const updateUser = async (req: express.Request, res: express.Response): Promise<any> => {

        const updateUser: IUser = req.body;

        console.log(updateUser);
        try {
            const updatedUser = await userRepository.update(updateUser);

            res.json(updatedUser);
        } catch (error) {
            var err: Error = error;

            res.status(500).send(err.message);
        }
    }
    return {
        [UserContollerActions.GET_USER]: getUser,
        [UserContollerActions.CREATE_USER]: createUser,
        [UserContollerActions.UPDATE_USER]: updateUser
    }
}