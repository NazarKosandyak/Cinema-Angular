
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/cinema'));
app.get('/*', (req, res) =>
      res.sendFile('index.html', {root: 'dist/cinema/'}),
);
app.listen(process.env.PORT || 5000);