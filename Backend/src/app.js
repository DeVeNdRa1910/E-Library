"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// extract app from express()
const app = (0, express_1.default)();
const allowedOrigins = [
    config_1.default.frontend_one,
    config_1.default.frontend_two // Frontend URL 2
];
app.use(express_1.default.json()); // post(or get) all data from DB
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Agar origin undefined hai (kuch tools jaise Postman se aa raha hai to `null` consider karega)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Request allow karo
        }
        else {
            callback(new Error('Not allowed by CORS')); // Request ko block karo
        }
    },
    credentials: true
})); // allow all browser to use this resource , you have to put frontend URL
//store cooki on client side
app.use((0, cookie_parser_1.default)());
// increase server timeout time
//Route
app.use('/api', index_routes_1.default);
//globle error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
