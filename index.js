const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('cars'));
app.use(fileUpload());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceCollection = client.db("car-repaire").collection("service");
    const reviewCollection = client.db("car-repaire").collection("review");

    app.post('/addservice', (req, res) => {
        const service = req.body;
        serviceCollection.insertOne(service)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    });

    app.get('/service', (req, res) => {
        serviceCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/isservice', (req, res) => {
        const email = req.body.email;
        reviewCollection.find({ email: email })
            .toArray((err, review) => {
                res.send(review.length > 0);
            })
    })
    app.post('/review', (req, res) => {
        const date = req.body;
        const email = req.body.email;
        reviewCollection.find({ email: email })
            .toArray((err, admins) => {
                const filter = { date: date.date }
                if (reviews.length === 0) {
                    filter.email = email;
                }
                serviceCollection.find(filter)
                    .toArray((err, documents) => {
                        console.log(email, date.date, reviews, documents)
                        res.send(documents);
                    })
            })
    })

    app.post('/status', (req, res) => {
        const file = req.files.file;
        const name = req.body.name;
        const email = req.body.email;
        .toArray((err, admins) => {
            const filter = { date: date.date }
            if (reviews.length === 0) {
                filter.email = email;
        };

        serviceCollection.insertOne({ name, email })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })

    app.get('/service', (req, res) => {
        serviceCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

    app.post('/isadmin', (req, res) => {
        const email = req.body.email;
        reviewCollection.find({ email: email })
            .toArray((err, review) => {
                res.send(review.length > 0);
            })
    })

});


app.listen(process.env.PORT || port)