let express = require('express');
let app = express();
const port = process.env.PORT || 3000
app.set('view engine', 'ejs');

const fs = require("fs");
const zipJSON = fs.readFileSync("ALL_TAX.json");
const zipList = JSON.parse(zipJSON)
const zipData = {}
zipList.reduce((accum, record) => {
    accum[record.ZipCode] = record
    return accum
}, zipData)


app.get('/', (req, res) => {
  res.render('index', {foo: 'FOO', zipData: {}});
});
app.get('/:zipcode', (req, res) => {
    const zipcode = req.params.zipcode
    if (!/^\d{5}$/.test(zipcode.trim())) res.end('Invalid Zip')
  res.render('index', {foo: zipcode, zipData: zipData[zipcode]});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
