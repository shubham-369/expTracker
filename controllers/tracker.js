const { error } = require('console');
const expense = require('../models/tracker');

exports.create = (req, res, next) => {
    const {id, amount, category, description} = req.body;
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

exports.edit = (req, res, next) => {
    const {editID} = req.params;
    if(editID){
        expense.findByPk(editID)
        .then(() => {
            res.redirect(`/form.html?editID=${editID}`);
        })
        .catch((error) => {
            console.log('error while deleting data', error);
            res.status(500).json({error:'Internal server error'});
        });
    }
};

// exports.getdata = (req, res, next) => {
//     const id = req.query;
//     console.log(id);
//     expense.findAll()
//     .then((data) => {
//         res.json(data);
//     })
//     .catch((error) => {
//         console.log('error while fetching data', error);
//         res.status(500).json({error:'Internal server error'});
//     });
// };
exports.getformdata = (req, res, next) => {
    console.log('inside form data');
    const id = req.query;
    console.log('form id ',id);
}