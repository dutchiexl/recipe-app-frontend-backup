"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UPLOAD_PATH = 'public';
const app = express_1.default();
const port = 3334;
app.use(express_1.default.static(UPLOAD_PATH));
class AssetServer {
    static run() {
        app.listen(port, () => console.log(`Asset server listening on port ${port}!`));
    }
}
exports.AssetServer = AssetServer;
