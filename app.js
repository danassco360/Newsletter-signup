const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html")
})
// app.get("/failure", function(req, res){
//     res.sendFile(__dirname + "/failure.html")
// })
// app.get("/success", function(req, res){
//     res.sendFile(__dirname + "/success.html")
// })
app.post("/", function(req, res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    console.log(firstName, lastName, email)

    var data = {
        member: [
            {   email_address: email,
                status: "subscribed",
                 merge_fields:{
                FNAME :firstName,
                LNAME : lastName
            },
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/f53f7ee615";
    const options = {
        method: "POST",
        auth: "sutelc:65f12a77c1e7798251892523d0a292e6-us7",

    }

    const request = https.request(url, options, function(response){

        response.on("data", function(data){ 
            const result = JSON.parse(data);
            console.log(result);
           
            if (response.statusCode === 200) {
                    res.sendFile(__dirname + "/success.html")
            } else {
                    res.sendFile(__dirname + "/failure.html")
            }
  
        });
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server running at port 3000.")
});







//API key 2
//65f12a77c1e7798251892523d0a292e6-us7
//List ID 2
//f53f7ee615


//CHATGPT VERSION
// const express = require("express");
// const bodyParser = require("body-parser");
// const https = require("https");

// const app = express();
// app.use(express.static("public"))
// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/signup.html");
// });

// app.post("/", function(req, res){
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     console.log(firstName, lastName, email);

//     var data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };

//     const jsonData = JSON.stringify(data);
//     const url = "https://us11.api.mailchimp.com/3.0/lists/7dcedb2e15";

//     const options = {
//         method: "POST",
//         auth: "sutelc:10b1600bc102e016668617c35b70cc7d-us11",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     // Making the request to Mailchimp API
//     const request = https.request(url, options, function(response) {
//         let data = '';
        
//         // Collect the data chunks
//         response.on("data", function(chunk) {
//             data += chunk;
//         });

//         // Once the response is complete, handle the result
//         response.on("end", function() {
//             const result = JSON.parse(data);
//             console.log(result);
            
//             // Handle successful or failed subscription
//             if (response.statusCode === 200) {
//                 res.send("Successfully subscribed!");
//             } else {
//                 res.send("There was an error. Please try again.");
//             }
//         });
//     });

//     // Write the JSON data and end the request
//     request.write(jsonData);
//     request.end();
// });

// app.listen(3000, function(){
//     console.log("Server running at port 3000.");
// });
