import { IRepository } from "../types/database";
import { IUserRepositoryDependencies } from "../types/dependencies";
import { RepositoryResolver } from "../types/resolvers";
import { IUser } from "../types/user";

export const userRepository: RepositoryResolver<IUserRepositoryDependencies, IUser> = (dependencies) => {
    const { dbContext } = dependencies;

    const get = async (): Promise<IUser[]> => {
        try {
            const users = await dbContext.userEntity.find();

            return users.map((userEntity) => {
                return {
                    id: userEntity.id,
                    email: userEntity.email,
                    password: userEntity.password,
                    userName: userEntity.userName
                }
            })
        } catch (error) {
            const err: Error = error;

            throw new Error(`Error in accessing users: ${err.message}`);
        }
    }

    const create = async (user: IUser): Promise<IUser> => {
        try {
            const newUser = new dbContext.userEntity();

            user.id = newUser.id;
            Object.assign(newUser, user);

            const savedEntity = await newUser.save();

            return { ...user, id: savedEntity.id };
        } catch (error) {
            const err: Error = error;

            throw new Error(`Error in creating user. User data: ${JSON.stringify(user)}, message: ${err.message}`);
        }
    }

    const update = async (updateUser: IUser): Promise<IUser> => {
        try {
            let existingUser = dbContext.userEntity.findById(updateUser.id);

            if (!existingUser)
                throw new Error(`User with id: ${updateUser.id} not found`);

            await dbContext.userEntity.update({ _id: updateUser.id }, updateUser);

            return updateUser;
        } catch (error) {
            const err: Error = error;

            throw new Error(`Error in updating user. User data: ${JSON.stringify(updateUser)}, message: ${err.message}`);
        }
    }
    return { get, create, update }
}