/**
 * User: xuhuan
 * Mail: 2865305193@qq.com
 * Time: 3/3
 */
$(function () {
	window.templateSettingsColumnList = [];
	
	//type=2 修改
	var args=comn.getArgs();
	var bankIdStr = "";
	 //load branch company list
	if(args['type']==2){
		//修改标题显示
		document.getElementsByTagName("h1")[0].innerHTML = "模板修改";
		
		var id=args['id'];
		//获取数据
		 comn.ajax({
		        url: 'za/templateSettings/getTemplateSettings',
		        async: false,
		        data: {id:id},
		        success: function (res) {
		        	bankIdStr = res.data.bankId;
	                $('.selectpicker').selectpicker('refresh');
		            if (res && res.code == 10000) {
		               if(typeof res=="string"){
		            	   res=JSON.parse(res);
		               }
		               $("#templateSttingsForm").values(res.data);
		               if(res.data.templateSettingsColumnList){
		            	   $("#table-1").setList(res.data.templateSettingsColumnList);
		               }
		            }
		            if (res && res.code == 20000) {
		                alert('系统繁忙，请稍后重试！');
		            }
		        }
		    });
	}
     comn.ajax({
        url: 'za/templateSettings/cooperationBankList',
        async: false,
        success: function (res) {
            if (res && res.code == 10000) {
                //var htmlArr = ['<option value="">--请选择--</option>'];
            	 //$('.branch-company-list1').html(htmlArr.join(''));
            	
                var htmlArr = [], bankIdArr = [];
                if(bankIdStr){
                	 bankIdArr = bankIdStr.split(",");
                }
               
                for (var i = 0; i < res.data.length; i++) {
                	var flag = false;
                	for (var j = 0; j < bankIdArr.length; j++) {
                		if (res.data[i].id == bankIdArr[j]) {
                			flag = true;
                		}
                	}                	
                    htmlArr.push('<option value="' + res.data[i].id + '" '+ (flag ? "selected" : "") +'>' + res.data[i].bankName + '</option>');
                }
                $('.selectpicker').html(htmlArr.join(''));
                $('.selectpicker').selectpicker({noneSelectedText:'--请选择--'});
                $('.selectpicker').selectpicker('refresh');
                
               
                
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });
    
	  $.fn.getList=function(){
		  var $this=$(this),arr=[],obj={},tr;
		  var len=$this.find("tr").length;
		  for(var i=1;i<len;i++){
			  //tr=$this.find("tr").eq(i);
			  obj={};
			  obj.name=$this.find("tr").eq(i).find("[name='execelId']").data("name");
			  obj.fieldName=$this.find("tr").eq(i).find("[name='fieldName']").val();
			  obj.execelId=$this.find("tr").eq(i).find("[name='execelId']").val();
			  obj.type=$this.find("tr").eq(i).find("[name='type']").val();
			  arr.push(obj);
		  }
		  return arr;
	  }
	  
	  $.fn.setList=function(data){
		  var $this=$(this),arr=[],obj={},tr;
		  var len=$this.find("tr").length;
		  if(data.length>0){
			  for(var i=1;i<len;i++){
				  $this.find("tr").eq(i).find("[name='execelId']").val(data[i-1]['execelId']);
				  $this.find("tr").eq(i).find("[name='fieldName']").val(data[i-1]['fieldName']);
				  $this.find("tr").eq(i).find("[name='type']").val(data[i-1]['type']);
			  }
		  }
	  }
    
    //保存
    $("#btn-save").click(function () {
        var bankIdString = ($("#bankId").val()).join(",");
        var bankTextArr = [];
        $("#bankId").find("option:selected").each(function() {
        	bankTextArr.push($(this).text())
        });;
        var bankTextString = bankTextArr.join(",");
    	//表单1 templateSttingsForm 表单2 templateSttingsColumnForm
    	$("#templateSttingsForm").validate();
    	if($("#templateSttingsForm").valid()==true){
    		
    		var data={};  
        	var templateSettingsColumnList=$('#table-1').getList();
        	data = $.extend($('#templateSttingsForm').values(), {templateSettingsColumnList:templateSettingsColumnList});
        	data.bankName= bankTextString;
        	data.bankId = bankIdString;
        	//data.bankName=$("#bankId").find("option:selected").text();
    		  //匹配列表去重复
            //alert(tableRepeat());
            var arr = []; 
       	    var g=/^[A-Z]+$/;
       	    var bo=true;
           //table 列表遍历
            $('#table-1 input[name="execelId"]').each(function(){
    	       	 var val=$(this).val();
    	       	 //判断excelId值为一位或则两位大写字母	    	
    	       	 if(val!='' &&  !g.test(val)){
    	       		 alert('请输入大写字母');
    	       		 bo=false;
    	       		 return false;
    	       	 }else{    		 
    	       		arr.push(val);       		
    	       	 }
    	       	 if(val.length>2){
    	       		alert('请输入1-2位大写字母');
    	       		bo=false;
    	       		return false;
    	       	 }
            });
            if(mm(arr)){
    	       	alert("EXCEL列ID填写重复");
    	       	return false;
            }
            
            var g = /^[1-9]*[1-9][0-9]*$/;
        	if(!g.test(data.startRowNumber)){
        		alert('数据开始行数输入错误，请输入正整数!');
        		return;
        	}
        	
        	//当类型为匹配项时，excelID必填
        	var flagType=0;
        	$("#table-1").find("tr").each(function(){
        		if(flagType!=0){
        			var type=$(this).find('select[name="type"]').val();
            		var execelId=$(this).find('input[name="execelId"]').val();
            		
            		if(type==1 && execelId==''){
            			alert("字段类型为【匹配项】时,EXECEL列ID为必填");
            			bo=false;
            			return false;
            		}
        		}
        		flagType=1;
        	})
        	
            var url='';
            if(data.id==''){
            	$('.panel-title').val('模板新增');
            	url='za/templateSettings/add';
            }else{
            	$('.panel-title').val('模板修改');
            	url='za/templateSettings/update';
            }
            
            if(bo){
            	comn.ajax({
                    url: url,
                    data: {
                    	data:JSON.stringify(data)
                    	},
                    success: function (res) {
                        if (res && res.code == 10000) {
                            alert('操作成功！');
                            window.location.href='index.html';
                        }
                        if (res && res.code == 20000) {
                            alert('操作失败！');
                        }
                        $('#btn-search').trigger('click');  
                        console.log(res);
                    }
                });
            }else{}
    	}
        
        if(data.bankId==''){
        	alert('合作银行为必填项!');
    		return;
        }      
        
         });
    
    
    //如果类型为 匹配项 则excelID为必填
//    $("#templateSttingsColumnForm .se").change(function(){
//    	var $this=$(this);
//    	var target=$this.parents("tr").find("[type='text']");
//    	if($this.val()==1){
//    		target.addClass("required");
//    	}else if($this.val()==2){
//    		target.removeClass("required");
//    	}
//    });
    
//    $('#btn-close').click(function () {
//    	window.
//    	
//    });
});

//function tableRepeat(){
//	 
//}

function mm(a){
 return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test("\x0f"+a.join("\x0f\x0f") +"\x0f");
}


