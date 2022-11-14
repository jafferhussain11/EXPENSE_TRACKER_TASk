const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const jsonparser = bodyParser.json();

const formController = require('../controllers/form');

const router = express.Router();//this is a function that returns an object

router.get('/',formController.getExpenses);
router.post('/addexpense',jsonparser,formController.insertExpense);
router.delete('/deletexpense/:id',formController.deleteExpense);

module.exports = router;