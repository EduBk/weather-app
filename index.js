//! IMPORT MODULES
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import indexRoutes from "./src/routes/index.routes.js";
import { envConfig } from "./src/helpers/config.js";

//! CREATE APP
const app = express();
const { port } = envConfig();

//! CREATE PATH URL
const __dirname = dirname(fileURLToPath(import.meta.url));

//! CONFIG URL AND VIEWS
app.set("port", port);
app.set("views", join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);

//! STATIC FILES
app.use(express.static(join(__dirname, "src/public")));

//! LISTENING PORT SERVER
app.listen(app.get("port"), () => {
  console.log("SERVER ON PORT: ", app.get("port"));
});
