"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./api/server"));
const server_2 = tslib_1.__importDefault(require("./assets/server"));
server_1.default.bootstrap().start(3333);
server_2.default.bootstrap().start(3334);
