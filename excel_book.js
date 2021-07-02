const db = require('./db');
const XLSX = require('xlsx');

let getBook = (sheetId) => {
    let _saveBooks = []
    let workbook = XLSX.readFile('./báo sách 7 tháng  tồn tối thiểu và số lượng đượt in.xls');
    let sheetname = workbook.SheetNames[sheetId];
    let worksheet = workbook.Sheets[sheetname];
    if (sheetId == 0) {
        let data = XLSX.utils.sheet_to_json(worksheet, {range: 0})
        for (let i of data) {
            let _saveBook = {
                ma_sach: i['Mã sách'],
                ten_sach: i['Tên sách'],
                gia_bia: i['Giá bìa'],
                phan_loai : 0
            }
            _saveBooks.push(_saveBook);
        }
    }
        if (sheetId == 4) {
            let data = XLSX.utils.sheet_to_json(worksheet, {range: 1})
            for (let i of data) {
                let _saveBook = {
                    ma_sach: i['Mã sách'],
                    ten_sach: i['Tên sách'],
                    gia_bia: i['Giá bìa'],
                    phan_loai: 1
                }
                _saveBooks.push(_saveBook);
            }
        } else {
            let data = XLSX.utils.sheet_to_json(worksheet, {range: 3})
            for (let i of data) {
                let _saveBook = {
                    ma_sach: i['Mã'],
                    ten_sach: i['Tên'],
                    gia_bia: i['Giá bìa'],
                    phan_loai : 2
                }
                _saveBooks.push(_saveBook);
            }
        }
        // console.log(_saveBooks)
        return _saveBooks;
    }
let saveBooktoDb = async (_id) => {
    let _books = await getBook(_id);
    // console.log(_books[226]);
    for ( let i = 1;i <_books.length; i ++){
        if (_books[i].ma_sach){
            let check = await db.book.findOne({
                where :{
                    ma_sach: _books[i].ma_sach
                }
            });
            if (!check)
                db.book.create(_books[i])
        }

    }
}
let ExToJson = () => {
    saveBooktoDb(0);
    saveBooktoDb(4);
}
module.exports = ExToJson;