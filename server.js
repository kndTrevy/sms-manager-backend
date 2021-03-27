const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const env = require('dotenv');
const adminRouter = require('./Routes/admin/auth.route');
const usersRouter = require('./Routes/user.route');

const app = express();
const multipartyMiddleware = multiparty({uploadDir:'./images'});


env.config();

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
};

mongoose.connect(process.env.PRODUCTION_DATABASE_URL, option)
    .then(() => {
        console.log('Db connection successfull');
    })
    .catch(error => {
        console.log(`Something went wrong ${error}`)
    });

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'uploads/pages')));
// app.use(express.static(path.join(__dirname, 'admin', 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
// });

app.use(cors());
app.use(express.json());

app.use('/api', adminRouter);
app.use('/api', usersRouter);


app.listen(process.env.PORT, () => {
    console.log("Server connected successfully on port " + process.env.PORT)
});