const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   
 res.sendFile(__dirname+"/index.html");   


});

app.post("/",function(req,res){

  const city = req.body.cityname;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=92aa2f8dcd1986065d85b277ef2e62b3&units=metric";
https.get(url,function(response){

console.log(response.statusCode);

  response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp =weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const idUrl ="https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
     res.write("<p>the weather is currently"+weatherDescription+"</p>");
    res.write("<h1>the temparature in "+city+" is"+temp+" degree celcius</h1>");
    res.write("<img src="+idUrl+">");
    res.send();
  });
});

})



app.listen(3000,function(){
    console.log("this is a server");
})