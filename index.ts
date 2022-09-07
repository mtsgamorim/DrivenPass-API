import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import routes from "./routes/index.js";
import errorHandling from "./middlewares/errorHandlingMiddleware.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(routes);
app.use(errorHandling);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server functionando na porta ${PORT}`));
