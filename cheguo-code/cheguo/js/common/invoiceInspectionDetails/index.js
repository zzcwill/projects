/**
 * Created by zlp on 18/10/10.
 */

//发票查验明细
comn.ajax({
    url: interUrl.common.invoiceGet,
    data: {
        projectId:args['projectId']
    },
    success: function (res) {
        $("#invoiceInspectionInfoForm").nameValues(res.data);
    }
});