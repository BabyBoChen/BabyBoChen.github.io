const ROUTE_TEMPLATEURLS = [
    {
        route: "/",
        templateUrl: "views/home.html",
    },
    {
        route: "/jQuery_homework",
        templateUrl: "views/jQuery_homework.html",
    },
    {
        route: "/pairGame",
        templateUrl: "views/pairGame.html",
    },
    {
        route: "/ransomLetter",
        templateUrl: "views/ransomLetter.html",
    },
    {
        route: "/bbljWeather",
        templateUrl: "views/bbljWeather.html",
    },
    {
        route: "/bbljCalendar",
        templateUrl: "views/bbljCalendar.html",
    },
    {
        route: "/jatatable",
        templateUrl: "views/jatatable.html",
    },
    {
        route: "/bblj_Catlord",
        templateUrl: "views/bblj_Catlord.html",
    },
    {
        route: "/srtPlayer",
        templateUrl: "views/srtPlayer.html",
    },
    {
        route: "/stock_tw",
        templateUrl: "views/stock_tw.html",
    },
    {
        route: "/bbljscooter",
        templateUrl: "views/bbljscooter.html",
    },
    {
        route: "/srtPlayerFX",
        templateUrl: "views/srtPlayerFX.html",
    },
    {
        route: "/bbljoverflow",
        templateUrl: "views/bbljoverflow.html",
    },
    {
        route: "/jdatatable",
        templateUrl: "views/jdatatable.html",
    },
    {
        route: "/kingTut",
        templateUrl: "views/kingTut.html",
    },
    {
        route: "/eren",
        templateUrl: "views/eren.html",
    },
    {
        route: "/mikasa",
        templateUrl: "views/mikasa.html",
    },
    {
        route: "/babybo",
        templateUrl: "views/babybo.html",
    },
    {
        route: "/spongebobSquarepants",
        templateUrl: "views/spongebobSquarepants.html",
    },
    {
        route: "/dog",
        templateUrl: "views/dog.html",
    },
    {
        route: "/blaze",
        templateUrl: "views/blaze.html",
    },
    {
        route: "/fan",
        templateUrl: "views/fan.html",
    },
    {
        route: "/lihit",
        templateUrl: "views/lihit.html",
    },
    {
        route: "/mannequinW",
        templateUrl: "views/mannequinW.html",
    },
    {
        route: "/mannequinM",
        templateUrl: "views/mannequinM.html",
    },
    {
        route: "/elephant",
        templateUrl: "views/elephant.html",
    },
    {
        route: "/mine",
        templateUrl: "views/mine.html",
    },
    {
        route: "/foodma",
        templateUrl: "views/foodma.html",
    },
    {
        route: "/socketio",
        templateUrl: "views/socketio.html",
    },
    {
        route: "/razorTodo",
        templateUrl: "views/razorTodo.html",
    },
    {
        route: "/dataTableReader",
        templateUrl: "views/dataTableReader.html",
    },
    {
        route: "/bblj3DViewer",
        templateUrl: "views/bblj3DViewer.html",
    },
    {
        route: "/bbljPwdManager",
        templateUrl: "views/bbljPwdManager.html",
    },
    {
        route: "/pwd_manager",
        templateUrl: "views/pwd_manager.html",
    },
    {
        route: "/haterBoy",
        templateUrl: "views/haterBoy.html",
    },
    {
        route: "/visitor_count",
        templateUrl: "views/visitor_count.html",
        controller: "visitorCountController"
    },
    {
        route: "/bbljCalendarApi",
        templateUrl: "views/bbljCalendarApi.html",
    },
    {
        route: "/chinookBi",
        templateUrl: "views/chinookBi.html",
    },
    {
        route: "/bbljtotp",
        templateUrl: "views/bbljtotp.html",
    },
    {
        route: "/pgdbcontext",
        templateUrl: "views/pgdbcontext.html",
    },
    {
        route: "/bbljfooddiary",
        templateUrl: "views/bbljfooddiary.html",
    },
    {
        route: "/py_prop_gen",
        templateUrl: "views/py_prop_gen.html",
        controller: "py_prop_genController"
    },
    {
        route: "/bbljreview",
        templateUrl: "views/bbljreview.html",
    },
    {
        route: "/googleSearch",
        templateUrl: "views/googleSearch.html",
        controller: "googleSearchController"
    },
    // {
    //     route: "/",
    //     templateUrl: "views/.html",
    // },
];

/** @param {angular.IModule} app  */
function registerRoutes(app) {
    app.config(function ($routeProvider) {
        ROUTE_TEMPLATEURLS.forEach(function(route_Template){
            let ctr = null;
            if(route_Template["controller"]){
                ctr = route_Template["controller"];
            }
            $routeProvider.when(route_Template.route, {
                templateUrl: route_Template.templateUrl,
                controller: ctr,
            });
        });
        // $routeProvider.when("/", {
        //     templateUrl: "views/home.html"
        // });
    });
}
export { registerRoutes };