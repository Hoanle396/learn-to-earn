require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./src/configs/database").connect();
const { router } = require("./src/controllers");
const swaggerDocs = require("./src/configs/swagger");
const { logger } = require("./src/utils/logger");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

swaggerDocs(app, port);
app.use(router);
app.listen(port, () => {
  console.log("hello")
  logger.star(`🚀 App listening on port ${port}`);
});
