const expense = require('../models/tracker');

exports.create = (req, res, next) => {
    const {id, amount, category, description} = req.body;
    console.log(req.body);
    if(id){
        expense.findByPk(id)
        .then((data) => {
            data.amount = amount;
            data.description = description;
            data.category = category;
            return data.save();
        })
        .then(() => res.redirect('/form.html'))
        .catch((error) => {
            console.log('error while creating data by id', error);
            res.status(500).json({error:'Internal server error'});
        });
    }else{
        expense.create({
            amount: amount,
            category: category,
            description: description
        })
        .then(() => res.redirect('/form.html'))
        .catch((error) => {
            console.log('error while creating data', error);
            res.status(500).json({error:'Internal server error'});
        });
    }
};
exports.delete = (req, res, next) => {
    const {delID} = req.params;
    if(delID){
        expense.destroy({where:{id:delID}})
        .then(() => res.redirect('/form.html'))
        .catch((error) => {
            console.log('error while deleting data', error);
            res.status(500).json({error:'Internal server error'});
        });
    }
}


exports.getdata = (req, res, next) => {
    expense.findAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log('error while fetching data', error);
        res.status(500).json({error:'Internal server error'});
    });
};
