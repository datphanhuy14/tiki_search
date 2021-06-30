var xlsx = require('xlsx')
const vieToEn = require('./vie_to_en')


// let exData = []
let dataPathExcel = "./báo sách 7 tháng  tồn tối thiểu và số lượng đượt in.xls";
let wb = xlsx.readFile(dataPathExcel);
// let sheetName = wb.SheetNames[0];
let sheetValue = wb.Sheets["SÁCH THANH LÝ "];
// console.log(sheetValue);
let excelData = xlsx.utils.sheet_to_json(sheetValue);

console.log(excelData);
