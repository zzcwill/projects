var dataLoad_1;
dataLoad_1 = function(params) {
    tableData(params, $("#user-form").values(), '/api/' + interUrl.loanModal.getModalList);
};