const PORT = 8000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const mongoose = require("mongoose");
const MONGODB_URI = `mongodb://localhost:27017/company`;
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true
  }
);

const Schema = mongoose.Schema;
const Customers = mongoose.model(
  "customers",
  new Schema(
    {
      first_name: String,
      last_name: String,
      age: Number,
      address: {
        street: String,
        city: String,
        state: String
      }
    },
    { timestamps: true }
  )
);

app.post("/customers", (req, res) => {
  Customers.create(req.body, (err, customer) => {
    if (err) return res.send("Gagal Coey");

    res.send("SUKSES MANTAAP");
  });
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
