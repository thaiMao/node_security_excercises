const express = require("express");
const bodyParser = require("body-parser");
const exec = require("child_process").exec;

const app = express();
const csp = require("helmet-csp");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    csp({
        defaultSrc: ["'Self'", "default.com"],
        scriptSrc: ["'Self'", "'unsafe-inline"],
        styleSrc: ["style.com"],
    })
);

var form = `
  <form method="POST" action="/host">
  <input type="text" name="host" placeholder="host" />
  <input type="submit" value="Get host" />
  </form> 
`;

app.get("/", function (req, res) {
    res.send(form);
});

app.post("/host", function (req, res) {
    execF(`host ${req.body.host}`, function (err, stdout, stderr) {
        if (err || stderr) {
            console.log(err || stderr);
            res.sendStatus(500);
            return;
        }

        res.send(
            `<h3>Lookup for: ${req.body.host}</h3>
            <pre>${stdout}</pre>
            ${form}
          `
        );
    });
});

app.listen(3000);
