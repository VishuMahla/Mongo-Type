const express = require("express");
const app = express();
const path = require("path");

const Chat = require("./models/chat.js")

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');

main()
.then((res) => {
    console.log(`connecting successful ${res}`);
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Typing');
}
app.set("views",path.join(__dirname,"views"));
app.set("view engine" , "ejs");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.listen(8080, ()=> {
    console.log("app is listening to the port 8080");
});

app.get("/", (req,res)=> {
    res.send("working...")
});


app.get("/chats" , async (req,res)=> {
    let chats = await Chat.find() ;
    res.render("chats.ejs" , {chats});
});

app.get("/chats/new" , (req,res) => {
    res.render("new.ejs");
});

app.post("/chats" , (req,res)=> {   
    let {from , to , msg } =  (req.body);
    let chat3 = new Chat ({
        from: from ,
        to: to ,
        msg: msg ,
        createdAt : new Date(),
    })
    chat3.save() ;
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res)=> {
    let { id } = req.params ;    
    let chat = await Chat.findById(id);
    res.render("edit.ejs" ,{ chat});
});


app.patch("/chats/:id" , async (req,res)=> {
    let { id } = req.params ;
    let { msg } = req.body ;
    await Chat.findByIdAndUpdate(id,{msg: msg});
    res.redirect("/chats") ; 
})

app.delete("/chats/:id" , async (req,res)=> {
    let { id } = req.params ;
    let { msg } = req.body ;
    await Chat.findOneAndDelete({_id:id})
    .then((res)=> {
        console.log(res);  
    })
    .catch((err)=> {
        console.log(err);
    })
    res.redirect("/chats");
})