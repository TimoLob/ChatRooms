
const sjcl = require("sjcl");


const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/chat_database_development");
const roomModel = require("./models").Room;
sequelize.authenticate().then(() => {
    console.log("Connection to db successful.");
}).catch(err => {
    console.error("Unable to connect to the database:",err);
});



const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("public"));
app.use(express.json(),cors());

app.put("/auth", async (req,res) => {
    console.log("request")
    console.log(req.body);
    const room = await roomModel.findOne({
        where: {
            name: req.body.roomName
        }
    });
    const passwordBitHash = sjcl.hash.sha256.hash(req.body.password);
    const passwordHash = sjcl.codec.hex.fromBits(passwordBitHash);
    console.log(passwordHash);
    if(!room) { // Room does not exist, create a new one
        let newRoom = await roomModel.create({
            name:req.body.roomName,
            password: passwordHash
        });
        console.log("New Room created");
        res.json({
            auth: true,
            roomId: newRoom.id,
            newRoom : true
        });
    } else {
        console.log("Room already exists");
        if(room.password === passwordHash) {
            res.json({
                auth : true,
                roomId : room.id
            });
            res.status(200);
        }
        else {
            console.log("Wrong Password");
            console.log(room.password,"!=",passwordHash);
            res.status(406);
            res.json({
                auth: false
            });
        }
        
    }
});


app.listen("8080", () => {
    console.log("listening 8080");
})