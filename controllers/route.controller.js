const db = require('../db');
const sequelize = require("sequelize");
const {Op} = require("sequelize");

let index = function (req, res, next) {
    // console.log(req.user)
    res.render('index', {user: req.user});
}
let sachTongHop = async function (req, res) {
    let limitPagi = 20;
    let page = req.params.page || 1;
    let getAll = await db.book.findAndCountAll({
        where: {
            phan_loai: 0
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
    res.render('table', {
        data: getAll.rows,
        pages: countPage,
        current: parseInt(page),
        entries: getAll.count,
        user: req.user
    });
}
let tikiBooks = async (req, res) => {
    let _page = req.query.page || 1;
    let _sort = req.query.sort || 'random()';
    let _limit = req.query.limit || 15;
    let _search = req.query.search || "";
    console.log(_search);
    let _gte = req.query.greaterThan || 0;
    let _lte = req.query.lessThan || 100;
    let _tikiBooks = await tikiCheck(_gte, _lte, _limit, _page, _sort, _search);
    // console.log(_tikiBooks.count)
    // res.json(_tikiBooks.rows);
    let countPage = Math.ceil(_tikiBooks.count / _limit)
    res.render('tikibooks', {
        pages: countPage,
        entries: _tikiBooks.count,
        data: _tikiBooks.rows,
        user: req.user,
        current: parseInt(_page),
        _sort,
        _limit,
        _gte,
        _lte,
    })
}
let sachThanhLy = async function (req, res) {
    let limitPagi = 20;
    let page = req.params.page || 1;
    let getAll = await db.book.findAndCountAll({
        where: {
            phan_loai: 1
        },
        offset: (page - 1) * limitPagi,
        limit: limitPagi,
        raw: true,
    })
    let countPage = Math.ceil(getAll.count / limitPagi)
    res.render('tablesales', {
        data: getAll.rows,
        pages: countPage,
        current: parseInt(page),
        entries: getAll.count,
        user: req.user
    });
}
let tikiCheck = async (_gte, _lte, _limit, _page, _sort, _search) => {
    let _tikiCheck = await db.tbook.findAndCountAll(
        {
            where: {
                [Op.and]: [
                    {ten_sach: {[db.Op.iLike]: '%' + _search + '%'}},
                    {
                        discount_rate: {
                            [Op.and]: [
                                {[Op.gte]: _gte},
                                {[Op.lt]: _lte}
                            ]
                        }
                    }
                ],
            },
            limit: _limit,
            offset: (_page - 1) * _limit,
            order: sequelize.literal(_sort),
            raw: true
        }
    )
    console.log(_tikiCheck.length);
    return _tikiCheck;
}
module.exports = {
    sachThanhLy,
    sachTongHop,
    index,
    tikiCheck,
    tikiBooks
}