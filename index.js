const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ip0tsyu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  const UserCollection = client.db("avengersTravel").collection("services");
  const ReviewCollection = client.db("avengersTravel").collection("reviews");

  try {
    app.post('/service', async (req, res) => {
      const service = req.body
      console.log(service);
      const result = await UserCollection.insertOne(service)
      res.send(result)
      console.log(result);

    })
    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = UserCollection.find(query)
      const services = await cursor.toArray()
      res.send(services)
    })
    app.get('/3service', async (req, res) => {
      const query = {}
      const cursor = UserCollection.find(query)
      const services = await cursor.limit(3).toArray()
      res.send(services)
    })
    app.post('/reviews', async (req, res) => {
      const review = req.body
      console.log(review);
      const result = await ReviewCollection.insertOne(review)
      res.send(result)
      console.log(result);

    })
    app.get('/service/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const service = await UserCollection.findOne(query)
      res.send(service)

    })
    app.get('/reviews', async (req, res) => {
      const query = {}
      const cursor = ReviewCollection.find(query)
      const reviews = await cursor.toArray()
      res.send(reviews)
    })
    app.get('/user-review/:id', async (req, res) => {
      const id = req.params.id
      const query = { userId: id }
      const userReview = await ReviewCollection.findOne(query)
      res.send(userReview)
    })
    app.delete('/review/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ReviewCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/review/:id', async (req, res) => {
      const id = req.params.id
      const status = req.body.status
      const query = { service_id: id }
      const updatedDoc = {
        $set: {
          status: status
        }
      }
      const serviceReview = await ReviewCollection.find(query, updatedDoc)
      res.send(serviceReview)
    })

  }
  finally {

  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Avengers Travel Is Running')
})

app.listen(port, () => {
  console.log('Avengers Travel Is Running ', port);
})