"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_server_1 = require("./asset-server/asset-server");
const api_server_1 = require("./api/api-server");
asset_server_1.AssetServer.run();
api_server_1.ApiServer.run();
