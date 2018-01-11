"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var wpdb_1 = require("./wpdb");
var ArticlePage_1 = require("./ArticlePage");
var FrontPage_1 = require("./FrontPage");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
function renderPageById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var rows, _i, rows_1, row, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wpdb_1.wpdb.query("SELECT * FROM wp_posts WHERE id=?", [id])];
                case 1:
                    rows = _a.sent();
                    for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        row = rows_1[_i];
                        page = {
                            title: row.post_title,
                            content: row.post_content
                        };
                        console.log(ReactDOMServer.renderToStaticMarkup(React.createElement(ArticlePage_1.ArticlePage, { page: page })));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderFrontPage() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(ReactDOMServer.renderToStaticMarkup(React.createElement(FrontPage_1.FrontPage, null)));
            return [2 /*return*/];
        });
    });
}
function main(target) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(target === 'front')) return [3 /*break*/, 2];
                    return [4 /*yield*/, renderFrontPage()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, renderPageById(parseInt(target))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    wpdb_1.wpdb.end();
                    return [2 /*return*/];
            }
        });
    });
}
main(process.argv[2]);
//# sourceMappingURL=renderPage.js.map