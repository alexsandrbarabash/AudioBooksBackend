const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server start on port ${PORT}`);
});
