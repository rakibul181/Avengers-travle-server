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
  try {
    app.post('/service', async (req, res) => {
      const service = req.body
      console.log(service);
      const result = await UserCollection.insertOne(service)
      res.send(result)
      console.log(result);

    })
    app.get('/services', async(req, res)=>{
      const query = {}
      const cursor = UserCollection.find(query)
      const services = await cursor.toArray()
      res.send(services)
  })

  app.get('/service/:id', async(req, res)=>{
    const id = req.params.id
    const query = {_id: ObjectId(id)}
    const service = await UserCollection.findOne(query)
    res.send(service)

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