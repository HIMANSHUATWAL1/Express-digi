import express from 'express'

const app=express();

const port=3000;

// if we  get data from frontend then--->

app.use(express.json()); // data as JSON() formate

//<--------------------Crud Operations----------------------->

let teaData=[]

let index=1;

// storing new data--->
app.post('/teas',(req,res)=>{
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
