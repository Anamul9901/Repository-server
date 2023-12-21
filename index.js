//anamulhaque9901
//k2eKGmnN5pK8a457

const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;


// middelware
app.use(cors());
app.use(express.json())



const uri = "mongodb+srv://anamulhaque9901:k2eKGmnN5pK8a457@cluster0.lyb9tdm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db('JobTask').collection('users');


    // user related api
    app.get('/users', async(req, res)=>{
        const result = await userCollection.find().toArray();
        res.send(result);
    })

    app.post('/users', async(req, res)=>{
        const createUser = req.body;
        const result = await userCollection.insertOne(createUser);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('job-task is running')
})

app.listen(port, ()=>{
    console.log(`Job-task is running on port ${port}`)
})