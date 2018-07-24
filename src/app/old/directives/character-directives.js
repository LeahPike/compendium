(function () {

    var app = angular.module('character-directives', []);

    app.directive("characterOverview", function () {
        return {
            restrict: "E",
            templateUrl: "directives/character-overview.html"
        };
    });

    app.directive("characterProfessions", function () {
        return {
            restrict: "E",
            templateUrl: "directives/character-professions.html"
        };
    });

    app.directive("characterProfession", function () {
        return {
            restrict: "E",
            templateUrl: "directives/character-profession.html",
            scope: {
                profession: '=data'
            }
        };
    });

})();
