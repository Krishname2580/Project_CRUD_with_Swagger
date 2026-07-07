require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const connectDB = require("./app/config/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static Folder */
app.use(express.static(path.join(__dirname, "public")));
connectDB();
/* View Engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


/* Routes */
const productEjsRoutes = require('./app/routes/productEjsRoutes')
app.use('/', productEjsRoutes);

const productRoutes = require("./app/routes/productRoutes");
app.use("/", productRoutes);

const userAuthRoute=require('./app/routes/userAuthRoute')
app.use('/',userAuthRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Server */
const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});