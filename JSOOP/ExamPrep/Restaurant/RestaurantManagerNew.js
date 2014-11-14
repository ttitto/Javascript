function processRestaurantManagerCommands(commands) {
    'use strict';

    (function initExtensions() {
        (function initStringExtensions() {
            String.prototype.isString = function (errorMessage) {
                if (typeof this !== 'string') {
                    throw new TypeError(errorMessage);
                }

                return this;
            };

            String.prototype.isNullEmptyUndefined = function (errorMessage) {
                if (!this) {
                    throw new ReferenceError(errorMessage);
                }

                return this;
            };

            if (!String.prototype.format) {
                String.prototype.format = function () {
                    var args = arguments;
                    return this.replace(/{(\d+)}/g, function (match, number) {
                        return typeof args[number] != 'undefined' ? args[number] : match;
                    });
                };
            }
        }());

        (function initNumberExtensions() {
            Number.prototype.isNumber = function (errorMessage) {
                if (typeof this !== 'number') {
                    throw  new TypeError(errorMessage);
                }

                return this;
            };

            Number.prototype.isInteger = function (errorMessage) {
                if ((this % 1) !== 0) {
                    throw  new TypeError(errorMessage);
                }

                return this;
            };

            Number.prototype.isInRange = function (min, max, errorMessage) {
                if ((this < min) || (this > max)) {
                    throw  new RangeError(errorMessage);
                }

                return this;
            };

            Number.prototype.isPositive = function (errorMessage) {
                if (this <= 0) {
                    throw  new RangeError(errorMessage);
                }

                return this;
            };

            Number.prototype.isNonNegative = function (errorMessage) {
                if (this < 0) {
                    throw  new RangeError(errorMessage);
                }

                return this;
            }
        }());
    }());

    var RestaurantEngine = (function () {
        var _restaurants, _recipes,
            Unit = {
                Grams: 'g',
                Millilitres: 'ml'
            };

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        var Restaurant = (function () {
            function Restaurant(name, location) {
                this.name = name;
                this.location = location;
                this._recipes = [];
            }

            Object.defineProperties(Restaurant.prototype, {
                name: {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value
                            .isString("Restaurant name should be of type string.")
                            .isNullEmptyUndefined("Restaurant name shouldn't be null, empty or undefined");
                    }
                },
                location: {
                    get: function () {
                        return this._location;
                    },
                    set: function (value) {
                        this._location = value
                            .isString("Restaurant location should be of type string.")
                            .isNullEmptyUndefined("Restaurant location shouldn't be null, empty or undefined");
                    }
                },
                recipes: {
                    get: function () {
                        return this._recipes;
                    }
                },
                addRecipe: {
                    value: function (recipe) {
                        this._recipes.push(recipe);
                    }
                },
                removeRecipe: {
                    value: function (recipe) {
                        this._recipes.splice(this._recipes.indexOf(recipe), 1);
                    }
                },
                printRestaurantMenu: {
                    value: function () {
                        var recipesStr = '',
                            drinks = [],
                            salads = [],
                            mainCourses = [],
                            desserts = [];

                        if (this.recipes.length == 0) {
                            recipesStr = '\nNo recipes... yet';
                        } else {

                            for (var i = 0; i < this.recipes.length; i++) {
                                var recipe = this.recipes[i];
                                if (recipe instanceof Drink) {
                                    drinks.push(recipe);
                                } else if (recipe instanceof Salad) {
                                    salads.push(recipe);
                                } else if (recipe instanceof MainCourse) {
                                    mainCourses.push(recipe);
                                } else if (recipe instanceof Dessert) {
                                    desserts.push(recipe);
                                }
                            }

                            if (drinks.length > 0) {
                                recipesStr += '\n~~~~~ DRINKS ~~~~~';
                                drinks.sort(function (a, b) {
                                    return  a.name > b.name;
                                });

                                drinks.forEach(function (drink) {
                                    recipesStr += '\n' + drink.toString();
                                });
                            }

                            if (salads.length > 0) {
                                recipesStr += '\n~~~~~ SALADS ~~~~~';
                                salads.sort(function (a, b) {
                                    return a.name > b.name;
                                });

                                salads.forEach(function (salad) {
                                    recipesStr += '\n' + salad.toString();
                                });
                            }

                            if (mainCourses.length > 0) {
                                recipesStr += '\n~~~~~ MAIN COURSES ~~~~~';
                                mainCourses.sort(function (a, b) {
                                    return a.name > b.name;
                                });

                                mainCourses.forEach(function (mainCourse) {
                                    recipesStr += '\n' + mainCourse.toString();
                                });
                            }

                            if (desserts.length > 0) {
                                recipesStr += '\n~~~~~ DESSERTS ~~~~~';
                                desserts.sort(function (a, b) {
                                    return a.name > b.name;
                                });

                                desserts.forEach(function (dessert) {
                                    recipesStr += '\n' + dessert.toString();
                                });
                            }
                        }

                        return '***** {0} - {1} *****{2}'.format(
                            this.name,
                            this.location,
                            recipesStr
                        );
                    }
                }
            });

            return Restaurant;
        }());

        var Recipe = (function () {
            function Recipe(name, price, calories, quantity, timeToPrepare, measureUnit) {
                if (this.constructor === Recipe) {
                    throw new Error('Cannot instantiate abstract class Recipe.');
                }

                this.name = name;
                this.price = price;
                this.calories = calories;
                this.quantity = quantity;
                this.timeToPrepare = timeToPrepare;
                this.measureUnit = measureUnit;
            }

            Object.defineProperties(Recipe.prototype, {
                name: {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value
                            .isString('Recipe name should be of type string.')
                            .isNullEmptyUndefined('Recipe name shouldn\'t be null, empty nor undefined');
                    }
                },
                price: {
                    get: function () {
                        return this._price;
                    },
                    set: function (value) {
                        this._price = value
//                            .isNumber("Recipe price should be of type number")
                            .isPositive('Recipe price should be positive number.');
                    }
                },
                calories: {
                    get: function () {
                        return this._calories;
                    },
                    set: function (value) {
                        this._calories = value
//                            .isNumber("Recipe calories should be of type number")
                            .isPositive("Recipe calories should be positive number");
                    }
                },
                quantity: {
                    get: function () {
                        return this._quantity;
                    },
                    set: function (value) {
                        this._quantity = value
//                            .isNumber("Recipe quantity should be of type number.")
                            .isPositive("Recipe quantity should be positive number");
                    }
                },
                timeToPrepare: {
                    get: function () {
                        return this._timeToPrepare;
                    },
                    set: function (value) {
                        this._timeToPrepare = value;
//                            .isNumber("Recipe timeToPrepare should be of type number.")
//                            .isPositive("Recipe timeToPrepare should be positive number");
                    }
                },
                measureUnit: {
                    get: function () {
                        return this._measureUnit;
                    },
                    set: function (value) {
                        this._measureUnit = value;
                    }
                },
                toString: {
                    value: function () {
                        return '==  {0} == ${1}\nPer serving: {2} {3}, {4} kcal\nReady in {5} minutes'
                            .format(
                                this.name,
                                this.price.toFixed(2),
                                this.quantity,
                                this.measureUnit,
                                this.calories,
                                this.timeToPrepare
                            );
                    }
                }
            });

            return Recipe;
        }());

        var Drink = (function () {
            function Drink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
                Recipe.call(this, name, price, calories, quantity, timeToPrepare, Unit.Millilitres);
                this.isCarbonated = isCarbonated;
            }

            Drink.prototype = Object.create(Recipe.prototype);
            Drink.prototype.constructor = this;

            Object.defineProperties(Drink.prototype, {
                isCarbonated: {
                    get: function () {
                        return this._isCarbonated;
                    },
                    set: function (value) {
                        this._isCarbonated = value;
                    }
                },
                toString: {
                    value: function () {
                        var drinkStr = Recipe.prototype.toString.call(this);
                        return drinkStr + '\nCarbonated: {0}'
                            .format(this.isCarbonated ? 'yes' : 'no');
                    }
                }
            });

            return Drink;
        }());

        var Meal = (function () {
            function Meal(name, price, calories, quantity, timeToPrepare, isVegan) {
                if (this.constructor === Meal) {
                    throw new Error('Cannot instantiate abstract class Meal.');
                }

                Recipe.call(this, name, price, calories, quantity, timeToPrepare, Unit.Grams);
                this.isVegan = isVegan;
            }

            Meal.prototype = Object.create(Recipe.prototype);
            Meal.prototype.constructor = this;

            Object.defineProperties(Meal.prototype, {
                isVegan: {
                    get: function () {
                        return this._isVegan;
                    },
                    set: function (value) {
                        this._isVegan = value;
                    }
                },
                toggleVegan: {
                    value: function () {
                        this.isVegan = !this.isVegan
                    }
                },
                toString: {
                    value: function () {
                        var recipeStr = Recipe.prototype.toString.call(this);
                        return (this.isVegan ? '[VEGAN] ' : '') + recipeStr;
                    }
                }
            });

            return Meal;
        }());

        var Dessert = (function () {
            function Dessert(name, price, calories, quantity, timeToPrepare, isVegan) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.withSugar = true;
            }

            Dessert.prototype = Object.create(Meal.prototype);
            Dessert.prototype.constructor = this;

            Object.defineProperties(Dessert.prototype, {
                withSugar: {
                    get: function () {
                        return this._withSugar;
                    },
                    set: function (value) {
                        this._withSugar = value;
                    }
                },
                toggleSugar: {
                    value: function () {
                        this.withSugar = !this.withSugar;
                    }
                },
                toString: {
                    value: function () {
                        var hasSugarStr = this.withSugar ? "" : '[NO SUGAR] ';
                        return hasSugarStr + Meal.prototype.toString.call(this);
                    }
                }
            });

            return Dessert;
        }());

        var MainCourse = (function () {
            function MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.type = type;
            }

            MainCourse.prototype = Object.create(Meal.prototype);
            MainCourse.prototype.constructor = this;

            Object.defineProperties(MainCourse.prototype, {
                type: {
                    get: function () {
                        return this._type;
                    },
                    set: function (value) {
                        // TODO: validate type
                        this._type = value;
                    }
                },
                toString: {
                    value: function () {
                        var mealStr = Meal.prototype.toString.call(this);
                        return mealStr + '\nType: {0}'.format(this.type);
                    }
                }
            });

            return MainCourse;
        }());

        var Salad = (function () {
            function Salad(name, price, calories, quantity, timeToPrepare, containsPasta) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, true);
                this.containsPasta = containsPasta;
            }

            Salad.prototype = Object.create(Meal.prototype);
            Salad.prototype.constructor = this;

            Object.defineProperties(Salad.prototype, {
                containsPasta: {
                    get: function () {
                        return this._containsPasta;
                    },
                    set: function (value) {
                        this._containsPasta = value;
                    }
                },
                toString: {
                    value: function () {
                        var mealStr = Meal.prototype.toString.call(this);
                        return mealStr + '\nContains pasta: {0}'.format(this.containsPasta ? 'yes' : 'no');
                    }
                }
            });

            return Salad;
        }());

        var Command = (function () {

            function Command(commandLine) {
                this._params = new Array();
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
            };

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
                if (results[results.length - 1] != '\n') {
                    results += '\n';
                }
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
