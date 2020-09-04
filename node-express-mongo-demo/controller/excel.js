var xlsx = require('node-xlsx').default;
var path = require('path');
var fs = require('fs');
var contentDisposition = require('content-disposition');

var { resDataApi } = require('../extend/api');


module.exports = {
  get: async function (req, res, next) {
    res.set('Content-Disposition', contentDisposition('excel.xlsx'));

    var url = path.resolve(__dirname, '../public/demo.xlsx');
    var excelData = xlsx.parse(fs.readFileSync(url));
    excelData[0].data.push(excelData[0].data[0]);

    const options = {'!cols': [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },{ wch: 20 } ]};    
    var buffer = xlsx.build([{ name: excelData[0].name, data: excelData[0].data }],options);
    res.end(buffer);
    
  },
  get2: async function (req, res, next) {
    var url = '/demo.xlsx'
    res.redirect(url)
  }
}