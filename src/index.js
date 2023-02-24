const express = require('express')
const app = express()

const bodyParser = require("body-parser");

const port = 8081

app.use(express.urlencoded());

const studentdata = require("./InitialData.js")

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
//showing all the data
app.get("/api/student",(req,resp)=>{
    resp.json(studentdata)
})

//showing perticular id data 
app.get("/api/student/:id",(req,resp)=>{
    const id = parseInt(req.params.id);
    const iddata = studentdata.find((s)=>s.id === id)
    console.log(iddata)
    if(iddata){
        resp.json(iddata);
    }else{
        resp.status(404).send('Student not found');
    }
})

//add another student in the list and also that student have also uniq id
app.post("/api/student",(req,resp)=>{
    const {name,currentClass,division} = req.body

    if(!name || !currentClass || !division){
        resp.status(400).json("student data invalid")
        return
    }
    const newstudent = {
        id:studentdata.length+1,
        name,
        currentClass:parseInt(currentClass),
        division
    }
    studentdata.push(newstudent)
    resp.json(newstudent);
})

//to update the perticular id of student 
app.put('/api/student/:id',(req,resp)=>{
    const id = parseInt(req.params.id);
    const name = req.body;
    const idstudent = studentdata.find((s)=>s.id === id);
    if (!idstudent){
        return resp.status(400).send('Student not found');
    }
    if (!name) {
        return resp.status(400).send('Name is required');
    }
    studentdata.name = name;
    resp.send(studentdata);
})

//to delete the perticular id 
app.delete("/api/student/:id",(req,resp)=>{
    const id = parseInt(req.params.id)
    const specificid = studentdata.find((s)=>s.id === id)
    if(specificid === -1){
        return resp.status(404).send('Student not found');
    }else{
        studentdata.splice(specificid, 1);
        resp.send(`Student with id ${id} has been deleted`);
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   