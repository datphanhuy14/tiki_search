const axios = require('axios');
const db = require('./db');

let getLink = async () => {
    let _links = [];
    for (let i = 1; i <= 69; i++) {
        let _link = `https://tiki.vn/api/v2/products?publisher_vn=MCBOOKS,BIZBOOKS,TKBOOKS&limit=100&page=${i}&sort=discount_percent,desc&src=static_block&_lc=Vk4wMzQwMjcwMDk=&order=discount_percent,desc`
        await _links.push(_link);
    }
    return _links;
}
let testAxios = async () => {
    let _links = await getLink();
    console.log('LOADING : ', _links.length);
    for (let _link of _links) {
        await axios.get(_link)
            .then(function (response) {
                // handle success
                let _results = [];
                let regex = /^\d+$/
                let results = response.data.data;
                for (let _result of results) {
                    // if (regex.test(_result.discount_rate) === 'true') {
                    _results.push({
                        id: _result.id,
                        ten_sach: _result.name,
                        sku: _result.sku,
                        gia_bia: _result.price,
                        discount_rate: _result.discount_rate
                    })
                    // }
                }
                return _results
            })
            .then(async (_results) => {
                for (let _saveResult of _results) {
                    let check = await db.tbook.findOne(
                        {
                            where: {
                                id: _saveResult.id
                            }
                        }
                    )
                    if (!check)
                        await db.tbook.create(_saveResult, {raw: true});
                    else {
                        if (check.gia_bia != _saveResult.gia_bia
                            || check.discount_rate != _saveResult.discount_rate
                            || check.ten_sach != _saveResult.ten_sach
                            || check.sku != _saveResult.sku) {
                            console.log('Id valid --> Find Log');
                            let check_v2 = await db.mclog.findOne({
                                    where:
                                        {
                                            id_update: _saveResult.id
                                        }
                                }
                            )
                            if (!check_v2) {
                                console.log('Create Logs 1');
                                await db.tbook.update(_saveResult, {where: {id: check.id}});
                                await db.mclog.create(
                                    {
                                        count: 1,
                                        note: 'change db',
                                        id_update: check.id
                                    }
                                )
                                console.log('Saved Change Database')
                            } else {
                                console.log('Create Logs 2');
                                await db.tbook.update(_saveResult, {where: {id: check.id}});
                                await db.mclog.create({
                                        count: parseInt(check_v2.count) + 1,
                                        note: 'changed db',
                                        id_update: _saveResult.id
                                    }
                                )
                                console.log('Saved Change Database')
                            }
                        }
                    }
                }
            })
            .then(() => {
                // console.log('DONE');
            })
            .catch(function (error) {
                // handle error
                console.log(error.message);
            })
            .then(function () {
                // always executed
            });
    }
}
module.exports = {
    testAxios
}