const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')
connectToMongo();




const app = express()
const port = 5000

app.use(cors())


// Use middeleware for sending jason by body
app.use(express.json())


// Available Routes 

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))




app.listen(port, () => {
  console.log(`iNotebook backend on http://localhost:${port}`)
})