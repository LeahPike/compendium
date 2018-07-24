(function () {

    var app = angular.module('characterCompendium', ['character-directives']);

    app.controller('characterController', ['$http', function ($http) {

        var data = {};
        var that = this;
        that.data = data;

        var characterList = [];
        characterList.push({ name: "Asumi", realm: "Azjol-Nerub" });
        characterList.push({ name: "Lexiss", realm: "Azjol-Nerub" });
        characterList.push({ name: "Livana", realm: "Azjol-Nerub" });
        characterList.push({ name: "Mayara", realm: "Azjol-Nerub" });
        characterList.push({ name: "Salus", realm: "Azjol-Nerub" });
        characterList.push({ name: "Sheeta", realm: "Azjol-Nerub" });
        characterList.push({ name: "Talah", realm: "Azjol-Nerub" });
        characterList.push({ name: "Valiah", realm: "Azjol-Nerub" });
        characterList.push({ name: "Zirelle", realm: "Azjol-Nerub" });
        characterList.push({ name: "Snowise", realm: "Azjol-Nerub" });
        characterList.push({ name: "Sunzie", realm: "Azjol-Nerub" });
        //characterList.push({ name: "Zikai", realm: "Khadgar" });

        this.findClass = function (pId) {
            for (var i = 0; i < data.classes.length; i++) {
                if (data.classes[i].id == pId)
                    return data.classes[i];
            }
        }
        this.findRace = function (pId) {
            for (var i = 0; i < data.races.length; i++) {
                if (data.races[i].id == pId)
                    return data.races[i];
            }
        }
        this.findClassColour = function (pClass) {
            var colour;
            switch (pClass) {
                case 6: // Death Knight
                    colour = "#C41F3B";
                    break;
                case 11: // Druid
                    colour = "#FF7D0A";
                    break;
                case 3: // Hunter
                    colour = "#ABD473";
                    break;
                case 8: // Mage
                    colour = "#69CCF0";
                    break;
                case 10: // Monk
                    colour = "#00FF96";
                    break;
                case 2: // Paladin
                    colour = "#F58CBA";
                    break;
                case 5: // Priest
                    colour = "#FFFFFF";
                    break;
                case 4: // Rogue
                    colour = "#FFF569";
                    break;
                case 7: // Shaman
                    colour = "#0070DE";
                    break;
                case 9: // Warlock
                    colour = "#9482C9";
                    break;
                case 1: // Warrior
                    colour = "#C79C6E";
                    break;
            }
            return colour;
        }

        //$http.get('https://eu.api.battle.net/wow/data/character/classes?locale=en_GB&apikey=yanbcy336j7653gbfm3mkq7sb8443e4q').success(function (result) {
        $http.get('data/classes.json').success(function (result) {
            data.classes = result.classes;
            data.classes.forEach(function (pClass) {
                pClass.colour = that.findClassColour(pClass.id)
            })
        });

        //$http.get('https://eu.api.battle.net/wow/data/character/races?locale=en_GB&apikey=yanbcy336j7653gbfm3mkq7sb8443e4q').success(function (result) {
        $http.get('data/races.json').success(function (result) {
            data.races = result.races;
        });

        data.characters = [];
        characterList.forEach(function (character) {
            $http.get('https://eu.api.battle.net/wow/character/' + character.realm + '/' + character.name + '?fields=professions+quests+talents+feed+achievements&locale=en_GB&apikey=yanbcy336j7653gbfm3mkq7sb8443e4q').success(function (result) {
            //$http.get('data/' + character.name + '.json').success(function (result) {
                result.class = that.findClass(result.class);
                result.race = that.findRace(result.race);
                data.characters.push(result);
            });
        })

    }]);

})();