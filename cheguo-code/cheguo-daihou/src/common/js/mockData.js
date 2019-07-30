let Mock = require('mockjs');
export default function () {
  return Mock.mock({
    'tableData|100': [
      {
        'customerName': '@cname',
        'cardNo|': '@string("number", 10)',
        'projectNo|10-60': 30,
        'overdueType|0-3': 1,
        'addUserName': '@cname(3)',
        'coBankName':  '@cword(3)',
        'launchOrgName': '@province',
        'riskType|1-2': 1,
        'bankPaymentDate': '@date',
        'status|0-4': 4,
        'loanAmount|+1': 1,
        'carType|0-4':  1,
        'bankData|10': [
          {
            'label': '@province',
            'value|+1': 1
          }
        ]
      }
    ]
  })
}
