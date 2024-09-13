"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function PokeStats1(yourPStats) {
    console.log("Your pokemon stats are:\nMove: ".concat(yourPStats.ability, ", Damage: ").concat(yourPStats.dmg, ", and HP: ").concat(yourPStats.hp));
}
function PokeStats2(enemyPStats) {
    console.log("Enemy pokemon stats are:\nMove: ".concat(enemyPStats.ability, ", Damage: ").concat(enemyPStats.dmg, ", and HP: ").concat(enemyPStats.hp));
}
var PokemonB = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        rl.question('What is your pokemon? [Examples are: charizard, pikachu]\nAnswer:', function (pokemonpick) { return __awaiter(void 0, void 0, void 0, function () {
            var yourPokemon, yourPokemondata, yourPokemonsMove, yourPokemonMovedata, yourPStats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(pokemonpick))];
                    case 1:
                        yourPokemon = _a.sent();
                        return [4 /*yield*/, yourPokemon.json()];
                    case 2:
                        yourPokemondata = _a.sent();
                        console.log("===================================");
                        console.log("You picked:  ".concat(yourPokemondata.name));
                        return [4 /*yield*/, fetch(yourPokemondata.moves[0].move.url)];
                    case 3:
                        yourPokemonsMove = _a.sent();
                        return [4 /*yield*/, yourPokemonsMove.json()];
                    case 4:
                        yourPokemonMovedata = _a.sent();
                        yourPStats = {
                            ability: yourPokemondata.moves[0].move.name,
                            dmg: yourPokemonMovedata.accuracy,
                            hp: yourPokemondata.stats[0].base_stat
                        };
                        console.log("===================================");
                        rl.question('What is the enemy pokemon? [Examples are: charizard, pikachu]\nAnswer: ', function (enemypick) { return __awaiter(void 0, void 0, void 0, function () {
                            var enemyPokemon, enemyPokemondata, enemyPokemonsMove, enemyPokemonsMovedata, enemyPStats, yourPokeAttacked, enemyPokeAttacked;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(enemypick))];
                                    case 1:
                                        enemyPokemon = _a.sent();
                                        return [4 /*yield*/, enemyPokemon.json()];
                                    case 2:
                                        enemyPokemondata = _a.sent();
                                        console.log("===================================");
                                        console.log("Enemy picked: ".concat(enemyPokemondata.name));
                                        return [4 /*yield*/, fetch(enemyPokemondata.moves[0].move.url)];
                                    case 3:
                                        enemyPokemonsMove = _a.sent();
                                        return [4 /*yield*/, enemyPokemonsMove.json()];
                                    case 4:
                                        enemyPokemonsMovedata = _a.sent();
                                        enemyPStats = {
                                            ability: enemyPokemondata.moves[0].move.name,
                                            dmg: enemyPokemonsMovedata.accuracy,
                                            hp: enemyPokemondata.stats[0].base_stat
                                        };
                                        console.clear();
                                        console.log("===================================");
                                        console.log("Battle between ".concat(yourPokemondata.name, " and ").concat(enemyPokemondata.name));
                                        console.log("===================================");
                                        console.log("Your pokemon:".concat(yourPokemondata.name, "\n"));
                                        PokeStats1(yourPStats);
                                        console.log("================VERSUS=================");
                                        console.log("\nEnemy pokemon:".concat(enemyPokemondata.name, "\n"));
                                        PokeStats2(enemyPStats);
                                        console.log("===================================");
                                        console.log("Fight!");
                                        yourPokeAttacked = yourPStats.hp - enemyPStats.dmg;
                                        enemyPokeAttacked = enemyPStats.hp - yourPStats.dmg;
                                        if (yourPokeAttacked > 0 && enemyPokeAttacked <= 0 || yourPokeAttacked > enemyPokeAttacked) {
                                            console.log("Your pokemon wins.");
                                            pokemonchoice();
                                        }
                                        else if (enemyPokeAttacked > 0 && yourPokeAttacked <= 0 || enemyPokeAttacked > yourPokeAttacked) {
                                            console.log("Enemy pokemon wins.");
                                            pokemonchoice();
                                        }
                                        else if (yourPokeAttacked <= 0 && enemyPokeAttacked <= 0 || yourPokeAttacked == enemyPokeAttacked) {
                                            console.log("It's a draw.");
                                            pokemonchoice();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var initialPokemon = function () {
    console.log("==============Pokemon Fight!==============");
    rl.question('Do you want to continue? y/n\nAnswer: ', function (menuanswer) {
        var option = menuanswer;
        switch (option) {
            case 'y':
                console.clear();
                pokemonchoice();
                break;
            case 'n':
                console.clear();
                console.log('Goodbye.');
                process.exit(0);
                break;
            default:
                console.clear();
                console.log("\nThe input isn't in any of the option. Pick only y/n.");
                initialPokemon();
                break;
        }
    });
};
initialPokemon();
var pokemonchoice = function () {
    console.log("===================================");
    rl.question('What choice do you want to go to?\n\t[1].Choose your pokemons to battle.\n\t[2].Exit.\n Answer: ', function (option1) {
        switch (option1) {
            case '1':
                console.clear();
                PokemonB();
                break;
            case '2':
                console.clear();
                console.log("Thank you for playing.");
                process.exit(0);
                break;
            default:
                console.log("Invalid input. Try again.");
                pokemonchoice();
                break;
        }
    });
};
