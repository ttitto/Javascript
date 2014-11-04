function processEstatesAgencyCommands(commands) {

    'use strict';
    var Helpers = (function () {
        function isBoolean(value, message) {
            switch (value) {
                case true:
                case false:
                    return true;
                default:
                    throw new Error(message);
            }
        }

        function validateIsString(value, message) {
            if (typeof value != "string") {
                throw new Error(message);
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

    var Estate = (function () {
        function Estate(name, area, location, isFurnitured) {
            if (this.constructor === Estate) {
                throw new Error('Cannot instantiate abstract class Estate.');
            }
            this.setName(name);
            this.setArea(area);
            this.setLocation(location);
            this.setIsFurnitured(isFurnitured);
            this._type = "Estate";
        }

        Estate.prototype.getName = function () {
            return this._name;
        };

        Estate.prototype.setName = function (name) {
            this._name = Helpers.validateIsString(name, "Estate name should be of string type");
            this._name = Helpers.validateStringIsEmpty(name, "Estate name can not be empty!");
        };

        Estate.prototype.getArea = function () {
            return this._area;
        };

        Estate.prototype.setArea = function (area) {
            if (!Helpers.isInteger(area)) {
                throw  new Error("Estate's area should be integer.");
            }

            this._area = Helpers.validateRange(area, 1, 10000, "Estate area should be in the range [1 - 10000]");
        };

        Estate.prototype.getLocation = function () {
            return this._location;
        };

        Estate.prototype.setLocation = function (location) {
            this._location = Helpers.validateIsString(location, "Estate's location should be of string type");
            this._location = Helpers.validateStringIsEmpty(location, "Estate's location can not be empty!");
        };

        Estate.prototype.getIsFurnitured = function () {
            return this._isFurnitured;
        };

        Estate.prototype.setIsFurnitured = function (value) {
            if (Helpers.isBoolean(value, "Estate isFurnitured should be true or false.")) {
                this._isFurnitured = value;
            }
        };

        Estate.prototype.getType = function () {
            return this._type;
        };

        Estate.prototype.toString = function () {
            var furnitured = this.getIsFurnitured() ? "Yes" : "No";

            var estateStr = this._type + ": Name = " + this.getName() +
                ", Area = " + this.getArea() +
                ", Location = " + this.getLocation() +
                ", Furnitured = " + furnitured;

            return estateStr;
        }

        return Estate;
    }());

    var BuildingEstate = (function () {
        var BuildingEstate = function (name, area, location, isFurnitured, rooms, hasElevator) {
            if (this.constructor === BuildingEstate) {
                throw  new Error("Can not instantiate abstract class BuildingEstate");
            }

            Estate.call(this, name, area, location, isFurnitured);
            this.setRooms(rooms);
            this.setHasElevator(hasElevator);
            this._type = "BuildingEstate";
        }

        BuildingEstate.prototype = Object.create(Estate.prototype);
        BuildingEstate.prototype.constructor = this;

        BuildingEstate.prototype.getRooms = function () {
            return this._rooms;
        }

        BuildingEstate.prototype.setRooms = function (rooms) {
            if (!Helpers.isInteger(rooms)) {
                throw  new Error("Building Estate's rooms should be integer number!");
            }

            this._rooms = Helpers.validateRange(rooms, 1, 100, "Building estate's rooms count should be in the range [1 - 100]");
        }

        BuildingEstate.prototype.getHasElevator = function () {
            return this._hasElevator;
        }

        BuildingEstate.prototype.setHasElevator = function (hasElevator) {
            if (Helpers.isBoolean(hasElevator, "Building estates' hasElevator should be of type boolean.")) {
                this._hasElevator = hasElevator;
            }
        }

        BuildingEstate.prototype.toString = function () {
            var estateStr = Estate.prototype.toString.call(this);
            var elevator = this.getHasElevator() ? "Yes" : "No";

            var beStr = estateStr + ", Rooms: " + this.getRooms() + ", Elevator: " + elevator;

            return beStr;
        }

        return BuildingEstate;
    }());

    var Apartment = (function () {
        function Apartment(name, area, location, isFurnitured, rooms, hasElevator) {
            BuildingEstate.call(this, name, area, location, isFurnitured, rooms, hasElevator);
            this._type = "Apartment";
        }

        Apartment.prototype = Object.create(BuildingEstate.prototype);
        Apartment.prototype.constructor = this;

        Apartment.prototype.toString = function () {
            return BuildingEstate.prototype.toString.call(this)
        }

        return Apartment;
    }());

    var Office = (function () {
        function Office(name, area, location, isFurnitured, rooms, hasElevator) {
            BuildingEstate.call(this, name, area, location, isFurnitured, rooms, hasElevator);
            this._type = "Office";
        }

        Office.prototype = Object.create(BuildingEstate.prototype);
        Office.prototype.constructor = this;

        Office.prototype.toString = function () {
            return BuildingEstate.prototype.toString.call(this);
        }

        return Office;
    }());

    var House = (function () {
        function House(name, area, location, isFurnitured, floors) {
            Estate.call(this, name, area, location, isFurnitured);
            this._type = "House";
            this.setFloors(floors);
        }

        House.prototype = Object.create(Estate.prototype);
        House.prototype.constructor = this;

        House.prototype.getFloors = function () {
            return this._floors;
        };

        House.prototype.setFloors = function (floors) {
            this._floors = Helpers.validateRange(floors, 1, 10, "House floors should be in the range [1 - 10]");
        };

        House.prototype.toString.call(this)
        {
            var houseStr = Estate.prototype.toString.call(this);

        }

        return House;
    }());

    var Garage = (function () {
        function Garage(name, area, location, isFurnitured, width, height) {
            Estate.call(this, name, area, location, isFurnitured);
            this.setWidth(width);
            this.setHeight(height);
            this._type = "Garage";
        }

        Garage.prototype = Object.create(Estate.prototype);
        Garage.prototype.constructor = this;

        Garage.prototype.getWidth = function () {
            return this._width;
        }

        Garage.prototype.setWidth = function (width) {
            if (!Helpers.isInteger(width)) {
                throw new Error("Garage's width should be integer.");
            }

            this._width = Helpers.validateRange(width, 1, 500, "Garage's width should be in the range [1 - 500]");
        }

        Garage.prototype.getHeight = function () {
            return this._height;
        }

        Garage.prototype.setHeight = function (height) {
            if (!Helpers.isInteger(height)) {
                throw new Error("Garage's height should be integer.");
            }

            this._height = Helpers.validateRange(height, 1, 500, "Garage's height should be in the range [1 - 500]");
        }

        return Garage;
    }());

    var Offer = (function () {
        function Offer(estate, price) {
            if (this.constructor === Offer) {
                throw new Error("Can not instantiate abstract class Offer.");
            }

            this.setEstate(estate);
            this.setPrice(price);
            this._type = "Offer";
        }

        Offer.prototype.constructor = this;

        Offer.prototype.getEstate = function () {
            return this._estate;
        }

        Offer.prototype.setEstate = function (estate) {
            this._estate = estate;
        }

        Offer.prototype.getPrice = function () {
            return this._price;
        }

        Offer.prototype.setPrice = function (price) {
            this._price = price;
        }

        return Offer;
    }());

    var RentOffer = (function () {
        function RentOffer(estate, price) {
            Offer.call(this, estate, price);
            this._type = "Rent";
        }

        RentOffer.prototype = Object.create(Offer.prototype);
        RentOffer.prototype.constructor = this;

        return RentOffer;
    }());

    var SaleOffer = (function () {
        function SaleOffer(estate, price) {
            Offer.call(this, estate, price);
            this._type = "SaleOffer";
        }

        SaleOffer.prototype = Object.create(Offer.prototype);
        SaleOffer.prototype.constructor = this;

        return SaleOffer;
    }());

    var EstatesEngine = (function () {
        var _estates;
        var _uniqueEstateNames;
        var _offers;

        function initialize() {
            _estates = [];
            _uniqueEstateNames = {};
            _offers = [];
        }

        function executeCommand(command) {
            var cmdParts = command.split(' ');
            var cmdName = cmdParts[0];
            var cmdArgs = cmdParts.splice(1);
            switch (cmdName) {
                case 'create':
                    return executeCreateCommand(cmdArgs);
                case 'status':
                    return executeStatusCommand();
                case 'find-sales-by-location':
                    return executeFindSalesByLocationCommand(cmdArgs[0]);
                default:
                    throw new Error('Unknown command: ' + cmdName);
            }
        }

        function executeCreateCommand(cmdArgs) {
            var objType = cmdArgs[0];
            switch (objType) {
                case 'Apartment':
                    var apartment = new Apartment(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), parseBoolean(cmdArgs[6]));
                    addEstate(apartment);
                    break;
                case 'Office':
                    var office = new Office(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), parseBoolean(cmdArgs[6]));
                    addEstate(office);
                    break;
                case 'House':
                    var house = new House(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]));
                    addEstate(house);
                    break;
                case 'Garage':
                    var garage = new Garage(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), Number(cmdArgs[6]));
                    addEstate(garage);
                    break;
                case 'RentOffer':
                    var estate = findEstateByName(cmdArgs[1]);
                    var rentOffer = new RentOffer(estate, Number(cmdArgs[2]));
                    addOffer(rentOffer);
                    break;
                case 'SaleOffer':
                    estate = findEstateByName(cmdArgs[1]);
                    var saleOffer = new SaleOffer(estate, Number(cmdArgs[2]));
                    addOffer(saleOffer);
                    break;
                default:
                    throw new Error('Unknown object to create: ' + objType);
            }
            return objType + ' created.';
        }

        function parseBoolean(value) {
            switch (value) {
                case "true":
                    return true;
                case "false":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        function findEstateByName(estateName) {
            for (var i = 0; i < _estates.length; i++) {
                if (_estates[i].getName() == estateName) {
                    return _estates[i];
                }
            }
            return undefined;
        }

        function addEstate(estate) {
            if (_uniqueEstateNames[estate.getName()]) {
                throw new Error('Duplicated estate name: ' + estate.getName());
            }
            _uniqueEstateNames[estate.getName()] = true;
            _estates.push(estate);
        }

        function addOffer(offer) {
            _offers.push(offer);
        }

        function executeStatusCommand() {
            var result = '', i;
            if (_estates.length > 0) {
                result += 'Estates:\n';
                for (i = 0; i < _estates.length; i++) {
                    result += "  " + _estates[i].toString() + '\n';
                }
            } else {
                result += 'No estates\n';
            }

            if (_offers.length > 0) {
                result += 'Offers:\n';
                for (i = 0; i < _offers.length; i++) {
                    result += "  " + _offers[i].toString() + '\n';
                }
            } else {
                result += 'No offers\n';
            }

            return result.trim();
        }

        function executeFindSalesByLocationCommand(location) {
            if (!location) {
                throw new Error("Location cannot be empty.");
            }
            var selectedOffers = _offers.filter(function (offer) {
                return offer.getEstate().getLocation() === location &&
                    offer instanceof SaleOffer;
            });
            selectedOffers.sort(function (a, b) {
                return a.getEstate().getName().localeCompare(b.getEstate().getName());
            });
            return formatQueryResults(selectedOffers);
        }

        function formatQueryResults(offers) {
            var result = '';
            if (offers.length == 0) {
                result += 'No Results\n';
            } else {
                result += 'Query Results:\n';
                for (var i = 0; i < offers.length; i++) {
                    var offer = offers[i];
                    result += '  [Estate: ' + offer.getEstate().getName() +
                        ', Location: ' + offer.getEstate().getLocation() +
                        ', Price: ' + offer.getPrice() + ']\n';
                }
            }
            return result.trim();
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


    // Process the input commands and return the results
    var results = '';
    EstatesEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != '') {
            try {
                var cmdResult = EstatesEngine.executeCommand(cmd);
                results += cmdResult + '\n';
            } catch (err) {
                //console.log(err);
                results += 'Invalid command.\n';
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
            console.log(processEstatesAgencyCommands(arr));
        });
    }
})();
