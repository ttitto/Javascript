function processTravelAgencyCommands(commands) {
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

            String.prototype.isDefinedNonEmpty = function (errorMessage) {
                if (typeof this != 'undefined' && this.length < 1) {
                    throw  new Error(errorMessage);
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
        (function initDateExtensions() {
            Date.prototype.isValidDate = function (errorMessage) {
                var year = this.getFullYear(),
                    month = this.getMonth(),
                    day = this.getDate();

                if (!(this instanceof Date)) {
                    throw new TypeError(errorMessage);
                }

                if (this.toString() != new Date(year, month, day).toString()) {
                    throw new RangeError(errorMessage);
                }
                return this;
            };
        }());
    }());

    var Models = (function () {
        var Destination = (function () {
            function Destination(location, landmark) {
                this.setLocation(location);
                this.setLandmark(landmark);
                this._type = 'Destination';
            }

            Destination.prototype.getLocation = function () {
                return this._location;
            }

            Destination.prototype.setLocation = function (location) {
                if (location === undefined || location === "") {
                    throw new Error("Location cannot be empty or undefined.");
                }
                this._location = location;
            }

            Destination.prototype.getLandmark = function () {
                return this._landmark;
            }

            Destination.prototype.setLandmark = function (landmark) {
                if (landmark === undefined || landmark == "") {
                    throw new Error("Landmark cannot be empty or undefined.");
                }
                this._landmark = landmark;
            }

            Destination.prototype.toString = function () {
                return this.constructor.name + ": " +
                    "location=" + this.getLocation() +
                    ",landmark=" + this.getLandmark();
            }

            return Destination;
        }());

        var Travel = (function () {
            function Travel(name, startDate, endDate, price) {
                
                if (this.constructor === Travel) {
                    throw new Error('Cannot instantiate abstract class Travel.');
                }

                this.name = name;
                this.startDate = startDate;
                this.endDate = endDate;
                this.price = price;
                this._type = 'Travel'
            }

            Object.defineProperties(Travel.prototype, {
                type: {
                    get: function () {
                        return this._type;
                    }
                },
                name: {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value
                            .isString("Travel name should be of type string.")
                            .isNullEmptyUndefined("Travel name shouldn't be empty string.");
                    }
                },
                startDate: {
                    get: function () {
                        return this._startDate;
                    },
                    set: function (value) {
                        this._startDate = value
                            .isValidDate("Travel start Date should be valid Date");
                    }
                },
                endDate: {
                    get: function () {
                        return this._endDate;
                    },
                    set: function (value) {
                        this._endDate = value
                            .isValidDate("Travel end Date should be valid Date");
                    }
                },
                price: {
                    get: function () {
                        return this._price;
                    },
                    set: function (value) {
                        this._price = value
                            .isNumber("The travel price should be of type number.")
                            .isNonNegative("The travel price should be non-negative.");
                    }
                },
                toString: {
                    value: function () {
                        return '* {0}: name={1}, start-date={2}, end-date={3}, price={4}'.format(
                            this.type,
                            this.name,
                            formatDate(this.startDate),
                            formatDate(this.endDate),
                            this.price.toFixed(2)
                        );
                    }
                }
            });

            return Travel;
        }());

        var Vacation = (function () {
            function Vacation(name, startDate, endDate, price, location, accommodation) {
                
                Travel.call(this, name, startDate, endDate, price);
                this.location = location;
                if (typeof accommodation != 'undefined') {
                    this.accommodation = accommodation;
                }
                this._type = 'Vacation';
            }

            Vacation.prototype = Object.create(Travel.prototype);
            Vacation.prototype.constructor = this;

            Object.defineProperties(Vacation.prototype, {
                location: {
                    get: function () {
                        return this._location;
                    },
                    set: function (value) {
                        this._location = value
                            .isNullEmptyUndefined("Vacation location should not be empty or undefined.");
                    }
                },
                accommodation: {
                    get: function () {
                        return this._accommodation;
                    },
                    set: function (value) {
                        this._accommodation = value
                            .isDefinedNonEmpty("Vacation accommodation should be non-empty string when exists.");
                    }
                },
                toString: {
                    value: function () {
                        var travelStr = Travel.prototype.toString.call(this);
                        return travelStr + ', location={0}, accommodation={1}'.format(
                            this.location,
                            this.accommodation
                        );
                    }
                }
            });

            return Vacation;
        }());

        var Excursion = (function () {
            function Excursion(name, startDate, endDate, price, transport) {
                
                Travel.call(this, name, startDate, endDate, price);
                this.transport = transport;
                this.destinations = [];
                this._type = 'Excursion';
            }

            Excursion.prototype = Object.create(Travel.prototype);
            Excursion.prototype.constructor = this;

            Object.defineProperties(Excursion.prototype, {
                destinations: {
                    get: function () {
                        return this._destinations;
                    },
                    set: function (value) {
                        this._destinations = value;
                    }
                },
                transport: {
                    get: function () {
                        return this._transport;
                    },
                    set: function (value) {
                        this._transport = value
                            .isNullEmptyUndefined("Excursion transport should be non empty string.");
                    }
                },
                addDestination: {
                    value: function () {
                        this.destinations.push(this);
                    }
                },
                removeDestination: {
                    value: function () {
                        var index = this.destinations.indexOf(this);
                        this.destinations.splice(index, 1);
                    }
                },
                toString: {
                    value: function () {
                        var travelStr = Travel.prototype.toString.call(this);
                        return travelStr + ', transport:{0}'
                            .format(this.transport);
                    }
                }
            });

            return Excursion;
        }());

        var Cruise = (function () {
            function Cruise(name, startDate, endDate, price, startingDock) {
                
                Excursion.call(this, name, startDate, endDate, price, 'cruise liner');
                if (typeof this.startingDock != 'undefined') {
                    this.startingDock = startingDock;
                }

                this._type = "Cruise";
            }

            Cruise.prototype = Object.create(Excursion.prototype);
            Cruise.prototype.constructor = this;

            Object.defineProperties(Cruise.prototype, {
                startingDock: {
                    get: function () {
                        return this._startingDock;
                    },
                    set: function (value) {
                        this._startingDock = value
                            .isDefinedNonEmpty("Cruise starting dock should be non-empty, when defined.");
                    }
                },
                toString: {
                    value: function () {
                        var excursionStr = Excursion.prototype.toString.call(this);
                        return excursionStr;
                    }
                }
            });

            return Cruise;
        }());

        return {
            Destination: Destination,
            Vacation: Vacation,
            Travel: Travel,
            Excursion: Excursion,
            Cruise: Cruise
        };
    }());

    var TravellingManager = (function () {
        var _travels;
        var _destinations;

        function init() {
            _travels = [];
            _destinations = [];
        }

        var CommandProcessor = (function () {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "excursion":
                        object = new Models.Excursion(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["transport"]);
                        _travels.push(object);
                        break;
                    case "vacation":
                        object = new Models.Vacation(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["location"], command["accommodation"]);
                        _travels.push(object);
                        break;
                    case "cruise":
                        object = new Models.Cruise(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["start-dock"]);
                        _travels.push(object);
                        break;
                    case "destination":
                        object = new Models.Destination(command["location"], command["landmark"]);
                        _destinations.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object._type + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index,
                    destinations;

                switch (command["type"]) {
                    case "destination":
                        object = getDestinationByLocationAndLandmark(command["location"], command["landmark"]);
                        _travels.forEach(function (t) {
                            if (t instanceof Models.Excursion && t.getDestinations().indexOf(object) !== -1) {
                                t.removeDestination(object);
                            }
                        });
                        index = _destinations.indexOf(object);
                        _destinations.splice(index, 1);
                        break;
                    case "excursion":
                    case "vacation":
                    case "cruise":
                        object = getTravelByName(command["name"]);
                        index = _travels.indexOf(object);
                        _travels.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object._type + " deleted.";
            }

            function processListCommand(command) {
                return formatTravelsQuery(_travels);
            }

            function processAddDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(command["location"], command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }
                travel.addDestination(destination);

                return "Added destination to " + travel.name + ".";
            }

            function processRemoveDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(command["location"], command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }
                travel.removeDestination(destination);

                return "Removed destination from " + travel.getName() + ".";
            }

            function getTravelByName(name) {
                var i;

                for (i = 0; i < _travels.length; i++) {
                    if (_travels[i].name === name) {
                        return _travels[i];
                    }
                }
                throw new Error("No travel with such name exists.");
            }

            function getDestinationByLocationAndLandmark(location, landmark) {
                var i;

                for (i = 0; i < _destinations.length; i++) {
                    if (_destinations[i].getLocation() === location
                        && _destinations[i].getLandmark() === landmark) {
                        return _destinations[i];
                    }
                }
                throw new Error("No destination with such location and landmark exists.");
            }

            function formatTravelsQuery(travelsQuery) {
                var queryString = "";

                if (travelsQuery.length > 0) {
                    queryString += travelsQuery.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processAddDestinationCommand: processAddDestinationCommand,
                processRemoveDestinationCommand: processRemoveDestinationCommand
            }
        }());

        var Command = (function () {
            function Command(cmdLine) {
                this._cmdArgs = processCommand(cmdLine);
            }

            function processCommand(cmdLine) {
                var parameters = [],
                    matches = [],
                    pattern = /(.+?)=(.+?)[;)]/g,
                    key,
                    value,
                    split;

                split = cmdLine.split("(");
                parameters["command"] = split[0];
                while ((matches = pattern.exec(split[1])) !== null) {
                    key = matches[1];
                    value = matches[2];
                    parameters[key] = value;
                }

                return parameters;
            }

            return Command;
        }());

        function executeCommands(cmds) {
            var commandArgs = new Command(cmds)._cmdArgs,
                action = commandArgs["command"],
                output;

            switch (action) {
                case "insert":
                    output = CommandProcessor.processInsertCommand(commandArgs);
                    break;
                case "delete":
                    output = CommandProcessor.processDeleteCommand(commandArgs);
                    break;
                case "add-destination":
                    output = CommandProcessor.processAddDestinationCommand(commandArgs);
                    break;
                case "remove-destination":
                    output = CommandProcessor.processRemoveDestinationCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "filter":
                    output = CommandProcessor.processFilterTravelsCommand(commandArgs);
                    break;
                default:
                    throw new Error("Unsupported command.");
            }

            return output;
        }

        return {
            init: init,
            executeCommands: executeCommands
        }
    }());

    var parseDate = function (dateStr) {
        if (!dateStr) {
            return undefined;
        }
        var date = new Date(Date.parse(dateStr.replace(/-/g, ' ')));
        var dateFormatted = formatDate(date);
        if (dateStr != dateFormatted) {
            throw new Error("Invalid date: " + dateStr);
        }
        return date;
    }

    var formatDate = function (date) {
        var day = date.getDate();
        var monthName = date.toString().split(' ')[1];
        var year = date.getFullYear();
        return day + '-' + monthName + '-' + year;
    }

    var output = "";
    TravellingManager.init();

    commands.forEach(function (cmd) {
        var result;
        if (cmd != "") {
            try {
                result = TravellingManager.executeCommands(cmd) + "\n";
            } catch (e) {
                result = "Invalid command." + "\n";
            }
            output += result;
        }
    });

    return output;
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
            console.log(processTravelAgencyCommands(arr));
        });
    }
})();