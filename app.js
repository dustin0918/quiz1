const express = require('express');
const logger = require('morgan');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const homeRouter = require("./routes/home");
const clucksRouter = require("./routes/clucks");
const app = express();


app.set("view engine", "ejs"); 
app.set("views", "views"); 
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser()); 
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use((req, res, next) => {
  console.log("Cookies:", req.cookies);
  res.locals.username = req.cookies.username;
  next();
})
app.use("/", homeRouter);
app.use("/clucks", clucksRouter);

const PORT = 4545;
const ADDRESS = 'localhost'; 
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});