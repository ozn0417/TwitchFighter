import { Router } from "express";

export interface ControllerRouter {
    router: Router;
    route: string;
}
