const express=require('express')
const dotenv=require('dotenv')
const app=express()
const port=process.env.PORT || 3000
const cors=require('cors')
app.use(cors());
dotenv.config()
app.use(express.json());
app.get('/',(req,res)=>{
     res.send("Hello World")
})
// mongoDb configuration 

const { MongoClient,ObjectId } = require("mongodb");

// URL-encoded password


// let uri = process.env.MONGOLAB_URI

// const client = new MongoClient(uri);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@cluster0.ilm5fpy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    // create a collection of documents
    const booksCollection=client.db("BookInventory").collection("books")

    // insert a book to the database using post method
    app.post("/upload-book",async(req,res)=>{
           const data=req.body;
           const result=await booksCollection.insertOne(data);
           res.send(result);
    })
    // get all books from database

    app.get("/all-books",async(req,res)=>{
        const books=booksCollection.find()
        const result=await books.toArray();
        res.send(result)
    })
    // update a book data patch or update
    const { ObjectId } = require('mongodb');

app.patch("/book/:id", async (req, res) => {
    const id = req.params.id;
    const updateBookData = req.body;
    
    try {
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: { ...updateBookData }
        };

        const result = await booksCollection.updateOne(filter, updateDoc);
        
        if (result.matchedCount > 0) {
            res.send({ message: 'Book updated successfully' });
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//  delete a book
app.delete("/book/:id",async(req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)}
     const result=await booksCollection.deleteOne(filter)
     res.send(result);

})
// find by categories
   app.get("/all-books",async(req,res)=>{
      let query={};
      if(req.query?.category){
        query={category:req.query.category}
      }
      const result=await booksCollection.find(query).toArray();
      res.send(result)

   })

   // to get single a book data
      app.get("/books/:id",async(req,res)=>{
        const id=req.params.id;
        const filter={_id:new ObjectId(id)}
        const result=await booksCollection.findOne(filter)
        res.send(result)
      })



    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected");
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})