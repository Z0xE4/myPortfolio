var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', 8822);


app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})  

var server = app.listen(app.get('port'), function() {
    console.log('listening on port ', server.address().port);
});