"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./application/app"));
const logging_1 = require("./application/logging");
app_1.default.listen(3000, () => {
    logging_1.logger.info('Listening on http://localhost:3000');
});
