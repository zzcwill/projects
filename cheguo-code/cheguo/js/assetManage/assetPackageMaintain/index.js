var dataLoad_1, handle, tableEvent;

dataLoad_1 = function(params) {
	tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.asset.loanAssetPackageManage);
};

tableEvent = {
    "click .state": function(e, a, item, index) {
        var stateName = item.status == 1 ? '融资中' : item.status == 2? '待发包' : '';
        $('#sure h3').html('确认将该资产包设置为'+stateName+'！');
        $("#sure").modal("show");
        return $("#OK").unbind('click').click(function() {
            return comn.ajax({
                url: interUrl.asset["loanAssetUpdateStatus"],
                data: {
                    status: item['status'],
                    id: item['id'],
                },
                success: function(res) {
                    tip({
                        content: "设置成功!!"
                    });
                    $("#sure").modal("hide");
                    $("#table").bootstrapTable('refresh');
                }
            });
        });
    },
  "click .update": function(e, a, item, index) {
    $("#addUser").modal("show");
    $("#modalTitle").text("修改资产包");
    $("#updateId").val(item.id);
    $("#addUser").find("input[name=userName]").val(comn.user.realname);
    return $("#addUser").find("#addUserForm").values(item);
  },
  "click .delete": function(e, a, item, index) {
    $('#sure h3').html('确定删除？');
    $("#sure").modal("show");
    return $("#OK").unbind('click').click(function() {
      return comn.ajax({
        url: interUrl.asset["loanAssetPackageDel"],
        data: {
          assetPackageId: item['id']
        },
        success: function(res) {
          tip({
            content: "删除成功!!"
          });
          $("#sure").modal("hide");
          $("#table").bootstrapTable('refresh');
        }
      });
    });
  }
};
// function deleteData

handle = function(value, row, index) {
    var state = row.status == 1 ? "启用" : row.status == 2 ? "停用" : '';
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='state'>" + state + "</a></li>",  "<li><a class='update'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};


function checkMoney(){
    var money = $("#addUser").find("input[name=assetPackageAmount]").val();
    var coCompanyId = $("#addUser").find("select[name=coCompanyId]").val();
    var startTime = $("#addUser").find("input[name=startTime]").val();
    var endTime = $("#addUser").find("input[name=endTime]").val();
    if(!( /^(([1-9]\d*)|0)(\.\d{1,2})?$/.test(money))){
        // alert("请输入正确的金额");
      $("#addUser").find("input[name=assetPackageAmount]").parent().addClass('has-error').append('<label id="assetPackageAmount-error" class="error" for="assetPackageAmount"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;请输入正确的金额</label>');
      return false;
    }else{
      $("#addUser").find("input[name=assetPackageAmount]").siblings('label').remove();
      $("#addUser").find("input[name=assetPackageAmount]").parent().removeClass('has-error');
      return true;
    }
}
function check1(){
    var coCompanyId = $("#addUser").find("select[name=coCompanyId]").val();
    if(coCompanyId == "" || coCompanyId== null){
        $("#coCompanyId-error").remove();
      $("#addUser").find("select[name=coCompanyId]").parent().addClass('has-error').append('<label id="coCompanyId-error" class="error" for="coCompanyId"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;请选择合作单位</label>');
      return false;
    }else{
        $("#coCompanyId-error").remove();
      //$("#addUser").find("input[name=coCompanyId]").siblings('label').remove();
      $("#addUser").find("select[name=coCompanyId]").parent().removeClass('has-error');
      return true;
    }
}
function check2(){
    var startTime = $("#addUser").find("input[name=startTime]").val();
    if(startTime== "" || startTime == null){
        $("#startTime-error").remove();
      $("#addUser").find("input[name=startTime]").parent().addClass('has-error').append('<label id="startTime-error" class="error" for="startTime"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;请选择放款开始日期</label>');
      return false;
    }else{
      $("#addUser").find("input[name=startTime]").siblings('label').remove();
      $("#addUser").find("input[name=startTime]").parent().removeClass('has-error');
      return true;
    }
}
function check3(){
    var endTime = $("#addUser").find("input[name=endTime]").val();
    if(endTime== "" || endTime == null){
        $("#endTime-error").remove();
      $("#addUser").find("input[name=endTime]").parent().addClass('has-error').append('<label id="endTime-error" class="error" for="endTime"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;请选择放款结束日期</label>');
      return false;
    }else{
      $("#addUser").find("input[name=endTime]").siblings('label').remove();
      $("#addUser").find("input[name=endTime]").parent().removeClass('has-error');
      return true;
    }
}
function check4(){
  var packageDelayDay = $("#addUser").find("input[name=packageDelayDay]").val();
  function judgeZhengNumber(str) {
    var reg = /^[1-9]\d*$/
    return reg.test(str)
  }
  if(packageDelayDay=== "" || !judgeZhengNumber(packageDelayDay)){
      $("#endTime-error").remove();
    $("#addUser").find("input[name=packageDelayDay]").parent().addClass('has-error').append('<label id="endTime-error" class="error" for="endTime"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;请输入大于0的正整数天数</label>');
    return false;
  }else{
    $("#addUser").find("input[name=packageDelayDay]").siblings('label').remove();
    $("#addUser").find("input[name=packageDelayDay]").parent().removeClass('has-error');
    return true;
  }
}


$(function () {
    $(".coCompanyId").getCooperationUnit();
	$("#add").click(function() {
    $("#addUser").modal("show");
    $("#addUser").find("input").val("");
    $("#addUser").find("textarea").val("");
    $("#coCompanyId").find("option[index='0']").attr("selected",true);
    $("#addUser").find("input[name=userName]").val(comn.user.realname);
    comn.ajax({
      url: interUrl.asset.getAssetPackageNo,
      success: function(res) {
       return $("#addUserForm").find("input[name=assetPackageNo]").val(res.data);
      }
    });
    $("#modalTitle").text("新增资产包");
  });

  $("#save").click(function() {
    if( check1()==true && checkMoney() == true && check2() == true && check3() == true && check4() == true){
    var data;
    data = $("#addUserForm").values();
    var coCompanyName=$('#coCompanyId option:selected').text();
    data["coCompanyName"] = coCompanyName;
    data["assetPackageNo"] = $("#addUserForm").find("input[name=assetPackageNo]").val();
	  if($('#updateId').val()!=""){
      data["id"] = $('#updateId').val();
	  }

    comn.ajax({
      url: interUrl.asset.loanAssetPackageSave,
      data: data,
      success: function(res) {
        $("#addUser").modal("hide");
        $("#table").bootstrapTable("selectPage", 1);

      }
    });
    }
  });
});
