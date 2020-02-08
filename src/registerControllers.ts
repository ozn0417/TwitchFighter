import * as express from "express";
import { UserController } from "./controllers/user_controller";
import { BetsController } from "./controllers/bets_controller";
import { ControllerRouter } from "./controllers/controller_router";

export class RegisterControllers {
    private controllers: ControllerRouter[] = [
        new UserController(),
        new BetsController()
    ];

    constructor(app: express.Express) {
        this.controllers.forEach(controller => {
            app.use(controller.route, controller.router);
        });
    }
}
