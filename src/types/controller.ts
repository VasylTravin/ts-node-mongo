import express from "express";

export type ControllerAction = (req: express.Request, res: express.Response) => Promise<any>;

export type Controller<ActionNames extends string> = {
    [key in ActionNames]: ControllerAction;
}
