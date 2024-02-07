import { addVisitorMain } from "./visitorCount.mjs";
import { registerRoutes } from "./routes.mjs";
import { visitorCountController } from "./visitorCountController.mjs";

addVisitorMain();

var app = angular.module("app", ["ngRoute"]);
registerRoutes(app);
visitorCountController(app);
