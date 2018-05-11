
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var count = 1;

var server = app.listen(1337, function() {
    console.log("listening on port 6789");
});
var io = require('socket.io')(server);




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');




io.on('connection', function (socket) { //2
    console.log(io.engine.clientsCount);
    io.emit('update_count', {num: count});
    socket.on('update_count', function()
    {
        count++;
        io.emit('update_count', {num: count});
    })

    socket.on('reset_count', function()
    {
        count = 0;
        io.emit('reset_count', {num: count});
    })

  });

app.get('/', function(req, res) 
{
    res.render("index");
})




