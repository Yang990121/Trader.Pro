const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
const bcrypt = require("bcrypt");

const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/async");

const User = require("../models/user");
const { validateUser } = require("../models/user");

const Stock = require("../models/stock");
const { validateStock } = require("../models/stock");

const Balance = require("../models/balance");
const { validateBalance } = require("../models/balance");

router.get(
  "/me",
  [auth],
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user.id).select("-_id");
    res.send(user);
  })
);

router.get("/find/:id", function(req,res) { 
  User.find({_id : req.params.id}, function(err, users) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
        var response = users;
        res.send(users)
    }
  })
})

router.get("/find", function(req,res) { 
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
        var response = users;
        res.send(users)
    }
  })
})



router.get("/stocksHeld/:id", function(req,res) { 
  Stock.find({userId : String(req.params.id)}, function(err, users) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
        var response = users;
        res.send(users)
    }
  })
})

router.post(
  "/add",
  asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered!");

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPasword,
    };

    user = new User(newUser);
    await user.save();

    user.sendConfirmationEmail(req.hostname).catch((err) => {});

    res.send(
      "Account created Successfully. Confirmation email has been sent to you. "
    );
    console.log("Account created Successfully");
  })
);

router.post(
  "/updateStock",
  asyncMiddleware(async (req, res) => {
    const { error } = validateStock(req.body); //body should contain user and stock --> validateStock should also verify user?
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalid User");

    const stock = new Stock(req.body)
    await stock.save();


    res.send("Stock updated Successfully");
    console.log("Stock updated Successfully");
  })

)

router.put(
  "/updateBalance",
  (async (req, res) => {
    const { error } = validateBalance(req.body); //body should contain user and stock --> validateStock should also verify user?
    if (error) return res.status(400).send(error.details[0].message);

    

    const newCashBalance = req.body.newCashBalance;
    const id = req.body.userId;

    try {
      console.log(req.body)
      await User.findById(id, (err, updatedBalance) => {
        console.log(updatedBalance)
        updatedBalance.cashBalance = newCashBalance
        updatedBalance.save()
        
      });
    } catch (err) {
      res.status(400).send(err);
    }
  })
);


router.put(
  "/changeStock",
  (async (req, res) => {
    const { error } = validateStock(req.body); //body should contain user and stock --> validateStock should also verify user?
    if (error) return res.status(400).send(error.details[0].message);

    

    const newPrice = req.body.price;
    const newQuantity = req.body.quantity;
    const ticker = req.body.ticker
    const id = req.body.userId;
    const latestPrice = req.body.latestPrice;

    try {
      console.log(req.body)
      await Stock.findById(id, (err, updatedStock) => {
        console.log("This is the stock that will be updated" + updatedStock)
        updatedStock.price = newPrice;
        updatedStock.quantity = newQuantity;
        updatedStock.latestPrice = latestPrice
        updatedStock.save();
        
      });
    } catch (err) {
      res.status(400).send(err);
    }
  })
);



  

module.exports = router;
