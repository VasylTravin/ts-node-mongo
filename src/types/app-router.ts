import { Router } from "express";

export interface IAppRoute {
    path: string;
    router: Router;
}
