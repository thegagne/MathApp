var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/math');

router.get('/', function(req, res) {
    var collection = db.get('formulas');
    collection.find({}, function(err, formulas){
        if (err) throw err;
      	res.json(formulas);
    });
});

router.post('/', function(req, res){
	var collection = db.get('formulas');
	collection.insert({
		title: req.body.title,
		formulastring: req.body.formulastring
	}, function(err, formula){
		if (err) throw err;

		res.json(formula);
	});
});

router.get('/:id', function(req, res) {
    var collection = db.get('formulas');
    collection.findOne({ _id: req.params.id }, function(err, formula){
        if (err) throw err;

      	res.json(formula);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('formulas');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        formulastring: req.body.formulastring
    }, function(err, formula){
        if (err) throw err;

        res.json(formula);
    });
});

module.exports = router;
