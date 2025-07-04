import { addVisitorMain } from "./visitorCount.mjs";
import { registerRoutes } from "./routes.mjs";
import { visitorCountController } from "./visitorCountController.mjs";
import { py_prop_genController } from "./py_prop_genController.mjs";
import { googleSearchController } from "./googleSearchController.mjs";

addVisitorMain();

var app = angular.module("app", ["ngRoute"]);
registerRoutes(app);
visitorCountController(app);
py_prop_genController(app);
googleSearchController(app);
