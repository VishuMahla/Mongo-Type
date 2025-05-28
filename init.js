const mongoose = require('mongoose');
const Chat = require("./models/chat.js") ;
main()
.then((res) => {
    console.log(`connecting successful ${res}`);
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Typing');
}

Chat.insertMany([
    {
        from: "neha",
        to: "preeti",
        msg: "teach me js",
        createdAt: new Date(),
    },
       {
        from: "vishal",
        to: "ritin",
        msg: "lets play bgmi ",
        createdAt: new Date(),
    },
       {
        from: "rahul",
        to: "divyanshu",
        msg: "do u have notes",
        createdAt: new Date(),
    },
       {
        from: "mummy",
        to: "papa",
        msg: "get home by time",
        createdAt: new Date(),
    },
       {
        from: "nishu",
        to: "vishal ",
        msg: "bring some fruits ",
        createdAt: new Date(),
    },
       {
        from: "kuldeep ",
        to: "raja ",
        msg: "lets go for dinner ",
        createdAt: new Date(),
    },
])