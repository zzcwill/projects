var xmlbuilder = require('xmlbuilder');

var { resDataApi } = require('../extend/api');

var obj = {
  root: {
    xmlbuilder: {
      repo: {
        '@type': 'git', // attributes start with @
        '#text': 'git://github.com/oozcitak/xmlbuilder-js.git' // text node
      }
    }
  }
};
 
var xml = xmlbuilder.create(obj).end({ pretty: true});

// console.info(xml)

module.exports = {
	get: async function (req, res, next) {
		res.json(resDataApi(10000,{
			data:xml
		},'xml传输'))
	}
}