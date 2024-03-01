const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;

const Filme = mongoose.model('Filme', { 
    title: String, 
    description: String, 
    image_url: String, 
    trailer_url:String
});

app.get('/', async (req, res)=>{
    const filmes = await Filme.find()
    res.send(filmes)
});

app.delete("/:id", async (req, res) =>{
    const filme = await Filme.findByIdAndRemove(req.params.id);
    return res.send(filme)
});

app.put("/:id", async (req, res) =>{
    const filme = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    });
    {
        new: true;
    }
});

app.post("/", async(req, res)=>{
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    })
    await filme.save()
    res.send(filme)
});

app.listen(port, ()=>{
    mongoose.connect('mongodb+srv://danielluiz1607:daniel0122b@starwar-api.b7m8k7o.mongodb.net/?retryWrites=true&w=majority&appName=StarWar-Api');
    console.log("App Running")
});