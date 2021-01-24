const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/blogers', { useUnifiedTopology: true });

app.use(express.json());
// all Routes
app.use('/', routes);


app.use('*', (req, res, next) => {
    res.status(404).json({ error: "not found" });
});

//error handler
app.use((err, req, res, next) => {
    //Map the error and send it to user
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
    }
    if (err.code == 11000) {
        return res.status(422).json({ statusCode: "validationError", prorerty: err.keyValue });
    }
    if (err.message === 'UN-AUTHENTICATED') {
        res.status(401).json({ statusCode: "UN-AUTHENTICATED" });
    }
    // console.log(err);
    res.status(503).end();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log("App is up ready on : " + PORT)
})