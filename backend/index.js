const express = require('express')
const app = express()
const path = require("path")
const port = 3000
const sequelize = require('./database')
const notesmd = require('./models/notes')
const cors = require('cors')

sequelize.sync().then(()=>console.log('db is ready.')).catch((e)=>console.log(e));

// enabling CORS for some specific origins only. 
let corsOptions = { 
  origin : ['http://localhost:5173'], 
} 
 
app.use(cors(corsOptions)) 

//json middleware
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'build/static')))

app.get('/notes', async (req, res)=>{
  const notes = await notesmd.findAll();
  res.send(JSON.stringify(notes));
})

app.get('/notes/:id', async (req, res)=>{
  const requestedId = req.params.id;
  notesmd.findOne({where: {id:requestedId}}).then((note)=>{
    if (note){
      res.send(JSON.stringify(note));
    }
    res.send("Not found.")
  })
})

app.post('/notes', async (req, res) => {
  notesmd.create(req.body).then(()=>{
    res.send("note is created.");
  }).catch((e)=>{
    res.send(e)
  })
})

app.delete('/notes/:id', async (req, res)=>{
  const requestedId = req.params.id;
  const note = await notesmd.findOne({where: {id:requestedId}})
  if(note){
    await note.destroy();
    res.send("note is deleted.")
  }else{
    res.send("note doesn't exist.")
  }
})


//serving html files
app.get("*", (_, res) => res.sendFile("index.html", { root: "build" }));

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}/`)
})