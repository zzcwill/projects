var dataLoad, handle;
$("#bankId").eContractBank();
$("#orgId").getOrg();
dataLoad = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.eContractSituation.list)
}
signType = function(value, row, index){
    return ["", "车国E", "车国B", "分享H5"][value] || null;
}
ongitudeAndLatitude = function(value, row, index){
    return row.signLongitude +","+ row.signLatitude
}