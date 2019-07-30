//boostrap-table插件定义参数start
//选择客户
dataLoad_6 = function(params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.complainRegister.list,
        data: $.extend($("#customerForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};
tableEvent_6 = {
    "click .choice": function (e, a, item, index) {
        var items = item;
        comn.ajax({
            url: interUrl.riskProfileManagement.riskProfileProjectDetail,
            data: {
                projectId:item.projectId
            },
            success: function(res) {
                $("#collectionForm_2").values(res.data);
                $("#collectionForm_2").values(items);

                $("#customerUnit").modal("hide");
            }
        });        
    }
};
handle_6 = function(value, row, index) {
    return "<div class='btn btn-xs btn-primary choice'>选择</div>";
}
//boostrap-table插件定义参数end

$(function(){
    var args = comn.getArgs();

    //客户姓名选择
    $("#btnSearch1").bind('click',function(){
        $("#table_6").bootstrapTable("refresh");
    });  

    //关闭按钮点击事件
    $("#cancle").bind('click',function(){
        window.parent.closeTab();
    }); 
    
    //处理完成点击事件
    $("#dealFinish").bind('click',function(){
        var data =  {
            companyFeedback: $('textarea[name="companyFeedback"]').val(),
            id: args['id'],
            status : $('name[name="status"]').val(),
        };  

        if(data.companyFeedback === '') {
            tip({content:'请输入分公司反馈'}); 
            return
        }          

        comn.ajax({
            url: interUrl.riskProfileManagement.riskProfileManagerUpdate,
            data:  data,
            success: function(res) {
                tip({content:'处理完成'});
                window.parent.closeTab();
            }
        });
    }); 
    //保存点击事件
    $("#btnSave").bind('click',function(){


        var data =  $.extend($("#collectionForm_2").values(),{
                id: args['id']
            });
        if(data.customerName === '') {
            tip({content:'请选择客户姓名'}); 
            return
        }
        if(data.overdueType === '') {
            tip({content:'请选择名单制类型'}); 
            return
        }
        if(data.riskType === '') {
            tip({content:'请选择风险类型'}); 
            return
        } 
        if(data.justification === '') {
            tip({content:'请输入核查缘由'}); 
            return
        }

        if(args['type'] === '4') {
            if(data.companyFeedback === '') {
                tip({content:'请输入分公司反馈'}); 
                return
            }             
        }                     

        comn.ajax({
            url: interUrl.riskProfileManagement.riskProfileAddRiskProfile,
            data:  data,
            success: function(res) {
                tip({content:'保存成功'});
                window.parent.closeTab();
            }
        });         
    });
    
    //url有传id进来就给页面赋值
    function getInfo() {
        if(args['id']) {
            comn.ajax({
                url: interUrl.riskProfileManagement.riskProfileDetail,
                data: {
                    id:args['id']
                },
                success: function(res) {
                    $("#collectionForm_2").values(res.data);
                }
            });            
            return
        }

        if(args['type'] === '3' && args['projectId']) {
            comn.ajax({
                url: interUrl.riskProfileManagement.riskProfileProjectDetail,
                data: {
                    projectId:args['projectId']
                },
                success: function(res) {
                    $("#collectionForm_2").values(res.data);
                }
            });             
        }       
    }

    //根据url 参数type 显示隐藏相关字段
    function getTypeToShow() {
        //新建风险档案
        if(args['type'] === '1') {
            $('#processingResults').addClass('hide');
            $('#companyFeedback').addClass('hide');
            $('#dealFinish').addClass('hide');

            if(args['projectId']) {
                $('#customerUnitBtn').attr("disabled",true);

                comn.ajax({
                    url: interUrl.riskProfileManagement.riskProfileProjectDetail,
                    data: {
                        projectId: args['projectId']
                    },
                    success: function(res) {
                        $("#collectionForm_2").values(res.data);
                        //$("#collectionForm_2").values(items);
                    }
                });                
            }
        } 

        //修改风险档案进来
        if(args['type'] === '2') {
            $('#customerUnitBtn').attr("disabled",true);
            $('#processingResults').addClass('hide');
            $('textarea[name="companyFeedback"]').attr("disabled",true);
            $('#dealFinish').addClass('hide');
        } 

        //查看风险档案详情进来
        if(args['type'] === '3') {
            $("#regFieldset").attr("disabled",true);
            $('#dealFinish').addClass('hide');            
            $('#btnSave').addClass('hide'); 
        } 
        
        //反馈登记进来
        if(args['type'] === '4') {
            $('#customerUnitBtn').attr("disabled",true);
            $('#overdueType').attr("disabled",true);
            $('#riskType').attr("disabled",true);
            $('textarea[name="justification"]').attr("disabled",true);
        }         
    }

    //首次加载执行方法
    //获取名单制类型列表和风险类型列表
    var dataArr =[["#overdueType", "overdueType"],['#riskType','riskType']];
    $.getCommonMethodPort(dataArr);
    
    getInfo();
    getTypeToShow();  
})
