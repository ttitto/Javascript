function processRestaurantManagerCommands(commands) {
    'use strict';
    var Helpers = (function () {
        function isBoolean(value, message) {
            switch (value) {
                case true:
                case false:
                    return true;
                default:
                    throw new TypeError(message);
            }
        }

        function validateIsString(value, message) {
            if (typeof value != "string") {
                throw new TypeError(message);
            }

            return value;
        }

        function isInteger(value) {
            return ((value ^ 0) === value);
        }

        function validateStringIsEmpty(value, message) {
            if (value.length < 1) {
                throw new Error(message);
            }

            return value;
        }

        function validateRange(value, min, max, message) {
            if (value < min || value > max) {
                throw  new Error(message);
            }

            return value;
        }

        if (!String.prototype.format) {
            String.prototype.format = function () {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined'
                        ? args[number]
                        : match
                        ;
                });
            };
        }

        return {
            isBoolean: isBoolean,
            isInteger: isInteger,
            validateIsString: validateIsString,
            validateStringIsEmpty: validateStringIsEmpty,
            validateRange: validateRange
        }
    }());

    var RestaurantEngine = (function () {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        var Unit = {
            Grams: 'g',
            Millilitres: 'ml'
        };

        var Restaurant = (function () {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this.setRecipes([]);
            }

            Restaurant.prototype.getName = function () {
                return this._name;
            };

            Restaurant.prototype.setName = function (name) {
                this._name = Helpers.validateIsString(name, "Restaurant name should be of type string.");
                this._name = Helpers.validateStringIsEmpty(name, "Restaurant name shouldn't be empty")
            };

            Restaurant.prototype.getLocation = function () {
                return this._location;
            };

            Restaurant.prototype.setLocation = function (location) {
                this._location = Helpers.validateIsString(location, "Restaurant location should be of type string.");
                this._location = Helpers.validateStringIsEmpty(location, "Restaurant location shouldn't be empty");
            };

            Restaurant.prototype.getRecipes = function () {
                return this._recipes;
            };

            Restaurant.prototype.setRecipes = function (recipes) {
                this._recipes = recipes;
            };

            Restaurant.prototype.addRecipe = function (recipe) {
                this._recipes.push(recipe);
            };

            Restaurant.prototype.removeRecipe = function (recipe) {
                var index = this._recipes.indexOf(recipe);
                if (index > -1) {
                    this._recipes.splice(index, 1);
                }
            };

            Restaurant.prototype.printRestaurantMenu = function () {

                var recipesCount = this.getRecipes().length,
                    recipesStr = "";
                if (recipesCount < 1) {
                    recipesStr = 'No recipes... yet\n';
                } else {

                    for (var i = 0; i < recipesCount; i++) {
                        recipesStr += this.getRecipes()[i].toString();
                    }
                }
                return "***** {0} - {1} *****\n{2}"
                    .format(
                        this.getName(),
                        this.getLocation(),
                        recipesStr
                    );
            };

            return Restaurant;
        }());

        var Recipe = (function () {
            function Recipe(name, price, calories, quantityPerServing, measureUnit, timeToPrepare) {
                if (this.constructor === Recipe) {
                    throw  new Error("Can not instantiate abstract class Recipe");
                }

                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantityPerServing(quantityPerServing);
                this.setMeasureUnit(measureUnit);
                this.setTimeToPrepare(timeToPrepare);
            }

            Recipe.prototype.getName = function () {
                return this._name;
            };

            Recipe.prototype.setName = function (name) {
                this._name = Helpers.validateIsString(name, "Recipe name should be of type string.");
                this._name = Helpers.validateStringIsEmpty(name, "Recipe name can not be null or empty.");
            };

            Recipe.prototype.getPrice = function () {
                return this._price;
            };

            Recipe.prototype.setPrice = function (price) {
                if (!(typeof price == 'number')) {
                    throw  new TypeError("Price should be of type number");
                }

                if (price < 0) {
                    throw  new RangeError('Price should be non-negative number.');
                }

                this._price = price;
            };

            Recipe.prototype.getCalories = function () {
                return this._calories;
            };

            Recipe.prototype.setCalories = function (calories) {
                if (!(typeof calories == 'number')) {
                    throw  new TypeError("Calories should be of type number");
                }

                if (calories < 0) {
                    throw  new RangeError('Calories should be non-negative number.');
                }

                this._calories = calories;
            };

            Recipe.prototype.getQuantityPerServing = function () {
                return this._quantityPerServing;
            };

            Recipe.prototype.setQuantityPerServing = function (quantityPerServing) {
                if (!(typeof quantityPerServing == 'number')) {
                    throw  new TypeError("QuantityPerServing should be of type number");
                }

                if (quantityPerServing < 0) {
                    throw  new RangeError('QuantityPerServing should be non-negative number.');
                }

                this._quantityPerServing = quantityPerServing;
            };

            Recipe.prototype.getMeasureUnit = function () {
                return this._measureUnit;
            };

            Recipe.prototype.setMeasureUnit = function (measureUnit) {
                // TODO: probably validation needed
                this._measureUnit = measureUnit;
            };

            Recipe.prototype.getTimeToPrepare = function () {
                return this._timeToPrepare;
            };

            Recipe.prototype.setTimeToPrepare = function (timeToPrepare) {
                if (!(typeof timeToPrepare == 'number')) {
                    throw  new TypeError("TimeToPrepare should be of type number");
                }

                if (timeToPrepare < 0) {
                    throw  new RangeError('TimeToPrepare should be non-negative number.');
                }

                this._timeToPrepare = timeToPrepare;
            };

            Recipe.prototype.toString = function () {
                return "==  {0} == ${1}\nPer serving: {2} {3}, {4} kcal\nReady in {5} minutes"
                    .format(this.getName(),
                        this.getPrice(),
                        this.getQuantityPerServing(),
                        this.getMeasureUnit(),
                        this.getCalories(),
                        this.getTimeToPrepare());
            };

            return Recipe;
        }());

        var Drink = (function () {
            function Drink(){

            }

            Drink.prototype = Object.create(Recipe.prototype);

            return Drink;
        }());

        var Meal = function () {
            // TODO: Not implemented
        }

        var Dessert = function () {
            // TODO: Not implemented
        }

        var MainCourse = function () {
            // TODO: Not implemented
        }

        var Salad = function () {
            // TODO: Not implemented
        }

        var Command = (function () {

            function Command(commandLine) {
                this._params = [];
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function (commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function (e) {
                        return true
                    });

                parametersKeysAndValues.forEach(function (p) {
                    var split = p
                        .split("=")
                        .filter(function (e) {
                            return true;
                        });
                    self._params[split[0]] = split[1];
                });
            }

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


// Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
            }
        }
    });

    return results.trim();
}

// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function () {
    var arr = [];
    if (typeof (require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line',function (line) {
            arr.push(line);
        }).on('close', function () {
            console.log(processRestaurantManagerCommands(arr));
        });
    }
})();
