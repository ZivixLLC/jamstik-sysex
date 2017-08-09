var express = require('express'),
    app = express();



app.use('/', express.static(__dirname + '/public'));
app.use('/article', express.static(__dirname + '/article'));

app.listen(process.env.PORT || 3000);
