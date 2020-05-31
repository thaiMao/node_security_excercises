const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    var form = `<form method="POST" action="/calc">
         <input type="text" name="formula" placeholder="formula" />
         <input type="submit" value="Calculate" />
         </form> 
  `;

    res.send(form);
});

app.post("/calc", function (req, res) {
    var formula = req.body.formula;
    var cleanFormula = formula.match(/[^0-9\-\/\*\+]/);

    if (cleanFormula.length < 1) {
        res.status(400).send("Invalid input");
        return;
    }

    var result;
    try {
        eval(`result = ${formula}`);
    } catch (e) {
        res.status(400).send("Invalid input");
        return;
    }

    res.send(`The result of ${cleanFormula} is: ${result}`);
});

app.listen(3000);
