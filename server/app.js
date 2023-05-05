"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const userRouter_1 = __importDefault(require("./src/routers/userRouter"));
const orderRouter_1 = __importDefault(require("./src/routers/orderRouter"));
const itemRouter_1 = __importDefault(require("./src/routers/itemRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Routing
app.use('/user', userRouter_1.default);
app.use('/order', orderRouter_1.default);
app.use('/item', itemRouter_1.default);
//connect to atlas and start listening
app.listen(process.env.PORT, () => {
    console.log("Node Is Listening.");
    mongoose_1.default.connect(process.env.ATLAS_URL || "")
        .then(() => {
        console.log("connect to Atlas.");
    });
});
