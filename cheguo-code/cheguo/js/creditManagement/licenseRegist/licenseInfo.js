var args, dataLoad_1,dataLoad_2,target;

args = comn.getArgs();
comn.ajax({
    url : interUrl.creditManagement.isValid,
    data : {
        projectId : args["projectId"]
    },
    success : function (res) {
        if (res.data == "1") {
            $(".isValid").removeClass("hide");
            $("input[name=brandModelName], input[name=billCompanyName], input[name=carTypeDesc]").addClass("required");
        } else {
            $(".isValid").addClass("hide");
            $("input[name=brandModelName], input[name=billCompanyName], input[name=carTypeDesc]").removeClass("required");
        }
    }
})

dataLoad_1 = function(params) {
  return tableData(params, {
	orgId: comn.user.companyId
  }, interUrl.gr.userList);
};

//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
  tableConfig[k] = v;
});
tableConfig['height'] = "240";

//未上牌原因记录
dataLoad_2 = function(params) {
  return tableData(params, {
    projectId:args['projectId']
  }, interUrl.creditManagement.failRecordList);
};

$("#table_2").bootstrapTable(tableConfig);


$(function() {

  $("#licenseInfo").on("blur", "#plateNo",function(){
	  console.log(this.value);
	  comn.ajax({
		  url: interUrl.common.getAreaFullNameByAreaName,
		  data: {
			  areaName: this.value
		  },
		  success: function(res){
			  $("#licenseInfo").values({plateArea: res.data}); 
		  }
	  })
  });
  $("#customerChoice").on("show.bs.modal", function() {
    return $("#customerChoice").find("table").bootstrapTable("destroy").bootstrapTable(comn.table);
  });
  $("#switch").html($("#tpl_1").html());
  $("#licenseInfo select[name='isRegistered']").change(function() {
    $("#licenseInfo").find("textarea[name='note']").val("");

      var flag = this.value == 1 ? true : false;
      var o = {
          operatorUid: flag ? comn.user.uid : "",
          operatorRealname: flag ? comn.user.realname : ""
      };
    return $("#switch").html($("#tpl_" + this.value).html()).values(o);
  });
    //before2016-06-02
  // $("#carBrand").getBrand().change(function() {
  //   if (this.value) {
  //     $("#carModel").val("");
  //     return $("#carMake").getCarList(this.value).unbind("change").change(function() {
  //       return $("#carModel").getCarModel(this.value);
  //     });
  //   }
  // });


  comn.ajax({
    url: interUrl.creditManagement.licenseGet,
    data: {
      plateId: args['plateId'],
      projectId: args['projectId']
    },
    success: function(res) {
	  target = $("#registerTargetSelect").html();
	  $("body").on("change", "#registerTarget", function(){
		  if (this.value == "2") {
			  $("#registerTargetSelect").html("");
		  }else{
			  $("#registerTargetSelect").html(target); 
		  }
	  });
      $("#formInfo").values(res.data);
      $("#licenseInfo").values(res.data);
      $("#licenseInfo select[name='isRegistered']").trigger("change");
      if (args['type'] === "show") {
		  $("#show").attr("disabled", true);
      }
        // $("#getBrand").getBrandC({
        //     code: res.data.carBrand,
        //     value: res.data.carBrandName
        // }, $("#getBrand").is(":disabled"));
        $("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
        $("#getCarList").getCarListC(res.data.carBrandKey, {
            code: res.data.carMake,
            value: res.data.carMakeName
        }, $("#getCarList").is(":disabled"));
        $("#getCarModel").getCarModelC(res.data.carSeriesKey, {
            code: res.data.carModel,
            value: res.data.carModelName
        }, $("#getCarModel").is(":disabled"));
        // $("#getBrand").change(function() {
        //     if (this.value) {
        //         $("#getCarModel").val("");
        //         $("#getCarList").getCarList(this.value).unbind("change").change(function() {
        //             if (this.value) {
        //                 $("#getCarModel").getCarModel(this.value);
        //             }
        //         });
        //     }
        // }); //2016-06-23
        //before 2016-06-02
	  // $("#getCarList").getCarList(res.data.carBrand, res.data.carMake);
	  // $("#getCarModel").getCarModel(res.data.carMake, res.data.carModel);
	  // $("#getBrand").getBrand(res.data.carBrand).change(function() {
		//   if (this.value) {
		// 	  $("#getCarModel").val("");
		// 	  $("#getCarList").getCarList(this.value).unbind("change").change(function() {
		// 		  if (this.value) {
		// 			  $("#getCarModel").getCarModel(this.value);
		// 		  }
		// 	  });
		//   }
	  // });
      $("#licenseInfo").values(res.data);
	  $("#registerTarget").trigger("change");
      $("#licenseInfo").values(res.data);
    }
  });

  $("#btnSave").click(function() {
    var o;
    if ($("#formInfo").valid() && $("#licenseInfo").valid()) {
      o = $.extend(args, $("#formInfo").values(), $("#licenseInfo").values());
      return comn.ajax({
        url: interUrl.creditManagement.licenseAdd,
        data: o,
        success: function(res) { comn.closeTab(); }
      });
    }
  });
  return $("#btnSure").click(function() {
    var arr;
    arr = $("#customerChoice").find("table").bootstrapTable('getSelections');
    if (arr.length < 1) {
      return tip({
        content: "请先选择一个用户再进行操作！！！"
      });
    }
    $("#userChoice").values({
      operatorUid: arr[0].uid,
      operatorRealname: arr[0].realname
    });
    return $("#customerChoice").modal("hide");
  });


});
