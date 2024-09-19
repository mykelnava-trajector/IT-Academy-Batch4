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
var _this = this;
var prompts = require('prompt-sync')();
var express = require('express');
var app = express();
app.listen(3000, function () { return console.log("Listening on port 3000."); });
var PokemonBox = [];
var StorePokemon = function (PokemonP) { return __awaiter(_this, void 0, void 0, function () {
    var PokeAPI, PokeAPIJSON, PokemonAPIImage, image, imageBase64, PBox2, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(PokemonP))];
            case 1:
                PokeAPI = _a.sent();
                return [4 /*yield*/, PokeAPI.json()];
            case 2:
                PokeAPIJSON = _a.sent();
                return [4 /*yield*/, fetch(PokeAPIJSON.sprites.front_default)];
            case 3:
                PokemonAPIImage = _a.sent();
                return [4 /*yield*/, PokemonAPIImage.arrayBuffer()];
            case 4:
                image = _a.sent();
                imageBase64 = Buffer.from(image).toString('base64');
                PBox2 = {
                    name: PokeAPIJSON.name,
                    image: imageBase64,
                    move: [],
                    sound: PokeAPIJSON.cries.latest
                };
                for (i = 0; i < PokeAPIJSON.moves.length; i++) {
                    PBox2.move.push(PokeAPIJSON.moves[i].move.name);
                }
                PokemonBox.push(PBox2);
                return [2 /*return*/];
        }
    });
}); };
var PokeDex = [
    { name: "Pokemon", url: "http://localhost:3000/" },
    { name: "StorePokemon", url: "http://localhost:3000/storepokemon?PokeP=(addpokemonname)" },
    { name: "View Box", url: "http://localhost:3000/viewbox" },
    { name: "View Pokemon", url: "http://localhost:3000/viewpokemon?PokeN=(pokemonname)" }
];
app.get("/", function (req, res) {
    res.json(PokeDex);
});
app.get("/storepokemon", function (req, res) {
    var PokeP = req.query.PokeP;
    StorePokemon(PokeP);
    if (PokeP) {
        res.send("Your pokemon ".concat(PokeP, " has been added to the box."));
    }
    else {
        res.send("Error, exited.");
    }
});
app.get("/viewbox", function (req, res) {
    res.json(PokemonBox);
});
app.get("/viewpokemon", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var PokeN, PokemonBox1;
    return __generator(this, function (_a) {
        PokeN = req.query.PokeN;
        PokemonBox1 = PokemonBox.find(function (pokemon) { return pokemon.name == PokeN; });
        if (PokemonBox1) {
            res.json(PokemonBox1);
        }
        else {
            res.send("No Pokemon Found.");
        }
        return [2 /*return*/];
    });
}); });
