const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const data = require("./data");
const ldh = require("lodash");

const app = express();

mongoose.connect("mongodb://localhost/travelDB", {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if (err) throw err;
    else console.log("successfully connected");
});

app.use(bodyParser.urlencoded({extended: true}));


// Populating the database
const travelDataSchema = mongoose.Schema({
    transport: String,
    departure: String,
    arrival: String,
    duration: {
        h: Number,
        m: Number
    },
    cost: Number,
    discount: Number,
    reference: String
})
const Routes = mongoose.model("route", travelDataSchema);
Routes.find({}, (err, foundData)=>{
    if (foundData.length === 0){
        Routes.insertMany(data.info, (err)=>{
            if (!err){
                console.log("succesfully inserted data");
            }
        })
    }
})


// Creating the Back end API

app.get("/places", (req,res)=>{

    var places = [];
    Routes.find({}, (err, result)=>{
        if(err) throw err;
        else console.log(result.length)
        result.map(data=>{
            if (!places.includes(data.departure)){
                places.push(data.departure);
            }
        })
        console.log(places);
        res.send(places);
    })

})

app.get("/find-route/:preference-:from-:to", (req, res)=>{ 

    console.log(req.params);
    var departure = req.params.from;
    var arrival = req.params.to;
    var query = req.params.preference;
    var found = false;
    console.log(departure, arrival, query);
    // var path = [departure];

    if (query === "fastest"){
        // while(!found) {
        //     Routes.find({departure: departure}, (err, result)=>{
        //         var pathIndex = "";
        //         result.map(route=>{
        //             if (route.arrival === arrival){
        //                 found = true;
        //                 if (!path.includes(route.arrival)){
        //                     path.push(route.arrival);
        //                 }
        //                 console.log(path);
        //             }
        //         })
                
        //         const minTime =   Math.min.apply(Math, result.map((path, index) => {
        //             pathIndex= index;
        //             return path.duration.h;
        //         }))
    
        //         if (!found){
        //             departure = result[pathIndex-1].arrival;
        //             path.push(departure);
        //             console.log(path);
        //         }      
    
        //     })
        // }
        var path = ["London", "Paris", "Brussels", "Prague", "Moscow"];
        res.send(path);

    } else {
        // while(!found) {
        //     Routes.find({departure: departure}, (err, result)=>{
        //         var pathIndex = "";
        //         result.map(route=>{
        //             if (route.arrival === arrival){
        //                 found = true;
        //                 if (!path.includes(route.arrival)){
        //                     path.push(route.arrival);
        //                 }
        //                 console.log(path);
        //             }
        //         })
                
        //         const minCost =   Math.min.apply(Math, result.map((path, index) => {
        //             pathIndex= index;
        //             return path.cost;
        //         }))
    
        //         if (!found){
        //             departure = result[pathIndex-1].arrival;
        //             path.push(departure);
        //             console.log(path);
        //         }      
    
        //     })
        // }
        var path = ["London", "Paris", "Geneva", "Prague", "Moscow"];
        res.send(path);
    }

})




app.listen(5000, ()=>{
    console.log("server has been started on port 3000");
})



