/**
 * Created by yubowen on 2018/10/8.
 */
//组册组件
Vue.component('v-input', vueComponent.inputComponent);
Vue.component('v-input2', vueComponent.inputComponent2);
Vue.component('v-select', vueComponent.selectComp);
Vue.component('v-table', vueComponent.tableComp);
Vue.component('v-area', vueComponent.areaChoose);
Vue.component('plan-date', vueComponent.planDate);
Vue.component('fee-select', vueComponent.feeselectComp);
var changeFlag = false

var vm = new Vue({
	el: '#totalUsedCars',
	/*
	 *初始化数据
	 * table1 , table2 表头
	 * branchBanks 分行
	 * status 状态
	 */
	data: {
		modal : false,
		table1: [
			{field: 'yearMonth', text: '年月'},
			{field: 'bankName', text: '分行'},
			{field: 'maxAmount', text: '最大进件数'},
			{field: 'secondCarNum', text: '本月二手车业务笔数'},
			{field: 'newCarNum', text: '本月新车业务笔数'},
			{field: 'remainingNumber', text: '剩余进件数'},
			{field: 'secondCarRate', text: '本月二手车占比'},
			{field: 'status', text: '状态', formater: 'statueUse'},
			{field: '', text: '操作',formater:'handle',events:'dataEvent'}
		],
		table2: [
			{field: 'orgName', text: '分公司'},
			{field: 'maxRate', text: '最大进件比例'},
			{field: 'totalNum', text: '本月业务总量'},
			{field: 'newCarNum', text: '其中新车'},
			{field: 'secondCarNum', text: '其中二手车'},
			{field: 'secondCarRate', text: '本月二手车占比'},
			{field: '', text: '操作',formater:'handle2',events:'dataEvent2'},
		],
		branchBanks:[],
		status:[
			{name:'启用',value:1},
			{name:'停用',value:0}
		]
	},
	methods: {
		newPlan(){
			$("#addMode").modal('show')
		},
		//搜索
		btnSearch(){
			$("#table1").bootstrapTable('refresh','{url:"..."}');
		},
		//清除查询条件
		resetForm(){
			$("#searchForm").html("")
			.selectpicker('refresh');
		},
		// 请求分行
		getBranchBankList(){
			console.log(interUrl.second.getBranchBankList)
			let that = this
			comn.ajax({
				url:interUrl.second.getBranchBankList,
				method:'post',
				success: function(res){
					that.branchBanks = res.data.map(item => {
						return {name:item.bankName,value:item.id}
					})
				}
			});
		},
		// 请求分行列表
		getBankList(){
			var feeGet=new Promise(function(resolve,reject){
				comn.ajax({
					url:interUrl.second.getBankList,
					method:'get',
					success: function(res){
						resolve(res.data);
					}
				});
			});
			feeGet.then(function(value){
				console.log(value)
			})
		},
		// 新增分行
		addBank(){
			var params = $("#addUserForm").values()
			console.log(params)
			if (!params.yearMonth) {
				tip({content:'请选择年月'})
				return
			}
			if (!params.bankId) {
				tip({content:'请选择银行'})
				return
			}if (!params.maxAmount) {
				tip({content:'请填写最大进件数'})
				return
			}
			let that = this;
			var feeGet=new Promise(function(resolve,reject){
				comn.ajax({
					url:interUrl.second.saveBank,
					method:'get',
					data:params,
					success: function(res){
						resolve(res);
					}
				});
			});
			feeGet.then(function(value){
				tip({content:value.message})
				if (value.code == 10000) {
					$("#addMode").modal('hide')
					that.btnSearch()
				}
			})
		},
		// 修改分行
		changeBank(){
			let params = Object.assign($("#changeUserForm").values(),{id:currentBank.id})
			console.log(params)
			if (!params.maxAmount) {
				tip({content:'请填写最大进件数'})
				return
			}
			let that = this;
			comn.ajax({
				url:interUrl.second.updateBank,
				method:'post',
				data:params,
				success: function(value){
					tip({content:value.message})
					if (value.code == 10000) {
						$("#changeMode").modal('hide')
						that.btnSearch()
					}
				}
			});
		},
		// 新增分公司配置
		saveConfig(){
			let obj = $("#addUserForm2").values() || {}
			if(!obj.orgId){
				tip({content:'请选择分公司'})
				return
			}
			if(!obj.maxRate){
				tip({content:'请填写进件比例'})
				return
			}
			let objParams = {
				orgId:obj.orgId.join(','),
				maxRate:obj.maxRate
			}
			let params = Object.assign(objParams,{configId:currentBank.id})
			console.log(params)
			let that = this;
			comn.ajax({
				url:interUrl.second.saveBranch,
				method:'post',
				data:params,
				success: function(value){
					tip({content:value.message})
					if (value.code == 10000) {
						$("#config").modal('hide')
						// that.btnSearch()
						$("#table2").bootstrapTable('refresh','{url:"..."}');
					}
				}
			});
		},
		// 修改分公司配置
		changeConfig(){
			let obj = $("#addUserForm3").values()
			if(!obj.maxRate){
				tip({content:'请填写进件比例'})
				return
			}
			let objParams = {
				maxRate:obj.maxRate
			}
			let params = Object.assign(objParams,{id:currentBranch.id})
			console.log(params)
			let that = this;
			comn.ajax({
				url:interUrl.second.updateBranch,
				method:'post',
				data:params,
				success: function(value){
					tip({content:value.message})
					if (value.code == 10000) {
						$("#table2").bootstrapTable('refresh','{url:"..."}');
						$("#changeConfig").modal('hide')
						// that.btnSearch()
					}
				}
			});
		}
	},
	ready() {
		$('.date').datetimepicker({
			minView:'year',
			autoclose:true,
			startView:3,
			format: 'yyyy-mm',
			language:'zh-CN'
		});
		this.getBranchBankList()
	}
});


var dataLoad,dataLoad2, handle, dataEvent, openStatus, statueUse,currentBank,currentItem,currentBranch;

$(".ibox-table2").hide();

// 二手车业务总量控制 表格
dataLoad = function (params) {
	var p;
	p = params.data;
	tableData(
		params,
		$.extend($("#searchForm").values(), p),
		interUrl.second.getBankList,
		function () {
			// 点击行的时候,请求下面的表格
			$("#table1").off("click-row.bs.table").on('click-row.bs.table', function (e, row, $element) {
				// console.log(e)
				$(".ibox-table2").show();
				if (e.target.nodeName != 'BUTTON') {
					dataLoad2(currentItem,row)
				}
			});
		}
	)
};
// 二手车业务总量控制 第二个表格
dataLoad2 = function (params,row) {
	currentItem = params
	tableData(
		params,
		{configId:row?row.id : ''},
		interUrl.second.getBranchList
	)
};

// 操作栏
handle = function (value, row, index) {
	let html
	if (row.status != 1) {
		html = `
		<button type="button" class="btn btn-primary btn-xs operate">修改</button>
		<button type="button" class="btn btn-primary btn-xs startStop">启用</button>
		<button type="button" class="btn btn-primary btn-xs openConfig">分公司配置</button>`
	}else{
		html = `<button type="button" class="btn btn-primary btn-xs startStop">停用</button>`
	}

	return [html];
};
// 操作栏
handle2 = function (value, row, index) {
	let html = `
		<button type="button" class="btn btn-primary btn-xs operate">修改</button>
		<button type="button" class="btn btn-primary btn-xs delete">删除</button>`
	return [html];
};

// $("#table1").bootstrapTable('refresh','{url:"..."}');

dataEvent = {
	"click .operate": function (e, a, item, index) {
		$("#changeMode").modal('show')
		let params = {id:item.id};
		currentBank = item
		comn.ajax({
			url:interUrl.second.getBank,
			method:'get',
			data:params,
			success: function(res){
				$("#changeUserForm").values(res.data)
			}
		});
	},
	"click .startStop": function (e, a, item, index) {
		let params = {id:item.id,status:+!item.status};
		currentBank = item
		comn.ajax({
			url:interUrl.second.resetBank,
			method:'post',
			data:params,
			success: function(res){
				tip({content:res.message})
				if (res.code = 10000) {
					$("#table1").bootstrapTable('refresh','{url:"..."}');
				}
			}
		});
	},
	"click .openConfig": function (e, a, item, index) {
		$("#config").modal('show')
		let params = {configId:item.id}
		currentBank = item
		console.log(params)
		comn.ajax({
			url:interUrl.second.getCompanyList,
			method:'post',
			data:params,
			success: function(value){
				console.log(value.data)
				let arr = value.data.map(item => `<option value="${item.id}">${item.name}</option>`)
				let html = arr.join(';')
				$("#group").children().remove()
				$("#group").append(html)
				$('.selectpicker').selectpicker('refresh');
			}
		});
	},
};
dataEvent2 = {
	"click .operate": function (e, a, item, index) {
		$("#changeConfig").modal('show')
		let params = {id:item.id};
		currentBranch = item
		comn.ajax({
			url:interUrl.second.getBranch,
			method:'post',
			data:params,
			success: function(value){
				console.log(value.data)
				$("#group2-option").text(value.data.orgName)
				$('.selectpicker').selectpicker('refresh');
				$("#addUserForm3").values(value.data)
			}
		});
	},
	"click .delete": function (e, a, item, index) {
		let params = {id:item.id}
		layer.confirm('确定要删除吗？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			comn.ajax({
				url:interUrl.second.deleteBranch,
				method:'post',
				data:params,
				success: function(value){
					console.log(value.data)
					layer.msg(value.message, {
						icon: 1
					});
					$("#table2").bootstrapTable('refresh','{url:"..."}');
				}
			});
		}, function() {

		});

	},
};

//使用状态
var arr = ['停用','启用',null]
statueUse = function (value) {
	return arr[value]
};


function getBranchCompany(row) {
	let params = {configId:row.id}
	console.log(row)
	comn.ajax({
		url:interUrl.second.getBranchList,
		method:'post',
		data:params,
		success: function(value){
			// $("#config").modal('show')
			$("#table2").bootstrapTable('refresh','{url:"..."}');
		}
	});
}