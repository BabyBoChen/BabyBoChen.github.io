import { getVisitorCt } from "./visitorCount.mjs";

/** @param {angular.IModule} app  */
function visitorCountController(app) {
    app.controller("visitorCountController", function($scope) {
        $scope.visitorCnt = 0;
        getVisitorCt('https://bblj-my-dart.azurewebsites.net/').then(function (count) {
            $scope.visitorCnt = count;
        });
    });
}

export { visitorCountController };