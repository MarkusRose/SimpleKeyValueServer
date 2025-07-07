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
exports.EncodingUtilities = void 0;
var EncodingUtilities = /** @class */ (function () {
    function EncodingUtilities() {
    }
    EncodingUtilities.base64EncodeUnicode = function (stringToEncode) {
        console.log(stringToEncode);
        var escaped = encodeURIComponent(stringToEncode);
        console.log(escaped);
        var escapedAndReplaced = escaped.replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        });
        console.log(escapedAndReplaced);
        return btoa(escapedAndReplaced);
    };
    EncodingUtilities.base64DecodeUnicode = function (stringToDecode) {
        var radixParameter = 16;
        var sliceParameter = -2;
        var decodedString = atob(stringToDecode);
        var escaped = decodedString
            .split('')
            .map(function (c) { return '%' + ('00' + c.charCodeAt(0).toString(radixParameter)).slice(sliceParameter); })
            .join('');
        return decodeURIComponent(escaped);
    };
    EncodingUtilities.base64EncodeBlob = function (blob) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            if (typeof reader.result === 'string') {
                                resolve(reader.result.split(',')[1]); // Removes the data URL prefix
                            }
                            else {
                                reject('Could not read Blob');
                            }
                        };
                        reader.onerror = function (error) { return reject(error); };
                    })];
            });
        });
    };
    EncodingUtilities.base64DecodeBlob = function (base64, mimeType) {
        var byteCharacters = atob(base64);
        var byteNumbers = new Array(byteCharacters.length).fill(0).map(function (_, i) { return byteCharacters.charCodeAt(i); });
        var byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };
    return EncodingUtilities;
}());
exports.EncodingUtilities = EncodingUtilities;
var myObject = {
    to: 'home',
    from: 'wörk 地にいすん',
    duration: Date.now(),
    enroute: true,
};
var instring = JSON.stringify(myObject);
var outstring = EncodingUtilities.base64EncodeUnicode(instring);
console.log(outstring);
var revertstring = Buffer.from(outstring, 'base64').toString();
console.log(JSON.parse(revertstring));
var sendstring = Buffer.from(revertstring).toString('base64');
console.log(JSON.parse(EncodingUtilities.base64DecodeUnicode(sendstring)));
