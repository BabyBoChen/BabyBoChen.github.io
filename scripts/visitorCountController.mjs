import { getVisitorCt } from "./visitorCount.mjs";

/** @param {angular.IModule} app  */
function visitorCountController(app) {
    app.controller("visitorCountController", async function($scope) {
        $scope.visitorCnt = 0;
        let count = await getVisitorCt('https://bblj-my-dart.azurewebsites.net/');
        $scope.visitorCnt = count;
        console.log($scope.visitorCnt);
    });
}

export { visitorCountController };
