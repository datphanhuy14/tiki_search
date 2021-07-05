const db = require('../db');

let index = function (req, res, next) {
    console.log(req.user)
    res.render('index', {user: req.user, all : count});
}
let sachTongHop = async function(req, res) {
    let limitPagi = 20;
    let page = req.params.page || 1;
    let getAll = await db.book.findAndCountAll({
        where : {
            phan_loai : 0
        },
        offset: (page - 1) * limitPagi,
        limit: limitPagi,
        raw: true,
    })
    // for (let i of getAll.rows){
    //   if(i.phan_loai == 0){
    //     _arr.push(i)
    //   }
    // }
    let countPage = Math.ceil(getAll.count / limitPagi)
    res.render('table', {data: getAll.rows,pages: countPage , current : parseInt(page),entries: getAll.count, user : req.user});
}
let sachThanhLy = async function(req, res) {
    let limitPagi = 20;
    let page = req.params.page || 1;
    let getAll = await db.book.findAndCountAll({
        where : {
            phan_loai : 1
        },
        offset: (page - 1) * limitPagi,
        limit: limitPagi,
        raw: true,
    })
    // for (let i of getAll.rows){
    //   if(i.phan_loai == 0){
    //     _arr.push(i)
    //   }
    // }
    let countPage = Math.ceil(getAll.count / limitPagi)
    res.render('tablesales', {data: getAll.rows,pages: countPage , current : parseInt(page),entries: getAll.count, user : req.user});
}
module.exports = {
    sachThanhLy,sachTongHop,index
}