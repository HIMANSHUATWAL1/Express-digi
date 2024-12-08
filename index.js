import 'dotenv/config'
import express from 'express'
import logger from './logger.js';
import morgan from 'morgan';

const app=express();

const port=process.env.PORT || 3000; // for deployment process

// if we  get data from frontend then--->

app.use(express.json()); // data as JSON() formate

//Logger creation---------->

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

//<--------------------Crud Operations----------------------->

let teaData=[]

let index=1;

// storing new data--->
app.post('/teas',(req,res)=>{
    logger.info("A post was made to add new tea");
    const {name ,price}=req.body;
    let newTea={
        "id":index++,
        name,
        price
    }

    teaData.push(newTea)

    res.status(202).send(teaData)
})


//getting all data-->

app.get('/teas',(req,res)=>{
    res.status(202).send(teaData)
})


// updating data--->

app.put('/teas:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===req.params)
    const {name,price}=req.body
    tea.name=name;
    tea.price=price;

    res.status(202).send(tea);
})

//delete data--->
app.delete('/teas:id',(req,res)=>{
    const tea=teaData.findIndex(t=>t.id===req.params)

    teaData.splice(tea,1);
    res.send("deleted");
})





app.listen(port,()=>{
    console.log(`Server is listning port ${port}....`);
    
})
