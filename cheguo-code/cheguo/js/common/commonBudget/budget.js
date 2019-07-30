'use strict';
//定义组件

var comp = {
	inputCompoent: Vue.extend({
		props: ['label', 'name', 'class', 'id', 'readonly', 'disabled', 'placeholder', 'keyup', 'btnCls', 'btnLabel', 'btnClick', 'm', 'value'],
		data: function data() {
			return {
				labelCls: 'col-md-3 col-xs-3 col-sm-3',
				divCls: 'col-md-5 col-xs-5 col-sm-5'
			};
		},
		template: ['<div class="input-tip">', '<label class="control-label {{ labelCls }}">', '<span class="text-danger" v-if="hasReqired()">*</span>&nbsp;{{ label }}:', '</label>', '<div class="{{ divCls }}">', '<div class="{{ btnCls }}">', '<input ', 'type="text" ', 'placeholder="请输入{{ placeholder || label }}" ', ':name="name" ', 'class="form-control {{ class || \'\' }}" ',
			//':class="{ dateISO: true }" ',
			':id="id" ', ':readonly="readonly" ', ':disabled="disabled" ', 'v-model="m" ', ':value="value" ', '@keyup="input(keyup)"', ' />', '<div class="input-group-btn" v-if="btnCls">', '<button type="button" class="btn btn-primary btn-sm"> {{ btnLabel }} </button>', '</div>', '</div>', '</div>', '</div>'].join(""),
		methods: {
			hasReqired: function hasReqired() {
				return this.class.indexOf("required") != -1;
			},
			input: function input() {
				var val = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

				if (this.m) {
					this.m = this.m.replace(/\ +/g, "").replace(/[ ]/g, "");
				} else {
					return;
				}
				switch (val) {
					case 'number':
						this.m = this.m.replace(/[^0-9.-]/g, '');
						break;
					default:
						return;
				}
			}
		}
	}),
	selectCompoent: Vue.extend({
		props: {
			label: { default: '' },
			name: { default: '' },
			class: { default: '' },
			id: { default: '' },
			options: { default: '' },
			disabled: { default: false },
			type: { default: false },
			m: { default: false },
			multiple: {default: false}
		},
		data: function data() {
			return {
				labelCls: 'col-md-3 col-xs-3 col-sm-3',
				divCls: 'col-md-5 col-xs-5 col-sm-5'
			};
		},
		template: ['<div class="input-tip">', '<label class="control-label {{ labelCls }}">', '<span class="text-danger" v-if="hasReqired()">*</span>&nbsp;{{ label }}:', '</label>', '<div class="{{ divCls }}">', '<select :name="name" class="form-control" :class="class" :id="id" :disabled="disabled" v-model="m" :multiple="multiple" @change="change()" />', '<option v-if="type == 0" v-for="item in options" :value="item.val" v-text="item.name" data-item="{{ item | json }}"></option>', '<option v-if="type == 1" v-for="item in options" data-item="{{ item | json }}" value="{{ $index ? $index : \'\' }}">{{ (item && item != "0") ? item : \'--请选择--\' }}</option>', '</select>', '</div>', '</div>'].join(""),
		methods: {
			hasReqired: function hasReqired() {
				return this.class.indexOf("required") != -1;
			},
			change: function change() {
				this.$dispatch('change', this.name, this.$el);
			}
		}
	}),
	radioCompoent: Vue.extend({
		props: ['label', 'name', 'class', 'options', 'disabled', 'type', 'm'],
		data: function data() {
			return {
				labelCls: 'col-md-3 col-xs-3 col-sm-3',
				divCls: 'col-md-5 col-xs-5 col-sm-5'
			};
		},
		template: ['<div class="input-tip">', '<label class="control-label {{ labelCls }}">', '<span class="text-danger" v-if="hasReqired()">*</span>&nbsp;{{ label }}:', '</label>', '<div class="{{ divCls }}">', '<div>', '<label v-for="item in options" class="radio-inline" v-if="type == 1 && item != \'\'">', '<input type="radio" :name="name" :class="class" :disabled="disabled" v-model="m" value=" {{ $index ? $index : \'\' }}"> {{ item }} &nbsp;&nbsp;&nbsp;&nbsp;', '</label>', '<label v-for="item in options" class="radio-inline" v-if="type == 0">', '<input type="radio" :name="name" :class="class" :disabled="disabled" v-model="m" value="{{ item.val }}"> {{ item.name }} &nbsp;&nbsp;&nbsp;&nbsp;', '</label>', '</div>', '</div>', '</div>'].join(""),
		methods: {
			hasReqired: function hasReqired() {
				return this.class.indexOf("required") != -1;
			}
		}
	})
};

//注册组件
Vue.component('v-input', comp.inputCompoent);
Vue.component('v-select', comp.selectCompoent);
Vue.component('v-radio', comp.radioCompoent);

//业务逻辑部分
/*
 *type = 0 更新
 *type = 1 保存
 *type = 2 查看
 */

var args = args || comn.getArgs();

function loadData(url, data, callback) {
	comn.ajax({
		url: url,
		data: data,
		success: function success(res) {
			vm.$data = res.data;
			vm.$set('GPS', false);
			if (typeof callback == "function") {
				callback(res.data);
			}
		}
	});
}

var vm = null;

//匿名函数
(function () {
	vm = new Vue({
		el: '#budget',
		computed: {
			downPaymentAmount: function downPaymentAmount() {
                if (this.carType == 2) { //汽车类型为二手车：首付款：（开票价 和 复评价取小的值）- 贷款额
                    var _price = this.evaluationPrice > this.billingPrice ? this.billingPrice : this.evaluationPrice; //复评价 和开票价， 哪个低取哪个；
                    return (this.num(_price) - this.num(this.loanAmount)).toFixed(2);
                }
				return (this.num(this.billingPrice) - this.num(this.loanAmount)).toFixed(2);
			},
			loanRatio: function loanRatio() {
				if (this.carType == 2) { //汽车类型为二手车：贷款金额/二手车复评价
					var _price = this.evaluationPrice > this.billingPrice ? this.billingPrice : this.evaluationPrice; //复评价 和开票价， 哪个低取哪个；
					return (this.num(this.loanAmount) / this.num(_price) * 100).toFixed(2);
				}
				return (this.num(this.loanAmount) / this.num(this.billingPrice) * 100).toFixed(2);
			},
			preCollectedAmount: function preCollectedAmount() {
				return (this.num(this.downPaymentAmount) + this.num(this.totalFee) - this.num(this.collectedAmount)).toFixed(2);
			},
			totalFee: function totalFee() {
				return (this.num(this.insuranceAmount) + this.num(this.pbDeposit) + this.num(this.accountDeposit) + this.num(this.costAmount) + this.num(this.purchaseTax) + this.num(this.guarantyRiskAmount) + this.num(this.serviceFee) + this.num(this.bankIrsFee) + this.num(this.licenseFee) + this.num(this.gpsInstallationFee) + this.num(this.doorSurveyFee) + this.num(this.valuationFee) + this.num(this.agencyFee) + this.num(this.outsourceSurveyFee) + this.num(this.liabilityAmount)).toFixed(2);
			},
			//应付金额=贷款金额+已收金额-费用合计-车商贴息政策+代收服务费  当业务品种为银行直销-垫款时,应付金额=贷款金额-费用合计+已收金额-新总总贴息金额+代收服务费
			payableAmount: function payableAmount() {
				var val = 0;
				if(this.fusePurchaseTaxFee || this.fuseGpsFee || this.fuseInsuranceFee){
					val = (this.num(this.loanAmount) + this.num(this.fusePurchaseTaxFee) + this.num(this.fuseGpsFee) + this.num(this.fuseInsuranceFee) + this.num(this.collectedAmount) - this.num(this.totalFee) - this.num(this.xzzDiscountAmount) + this.num(this.carDealerCollectionFee)).toFixed(2)
				}else{
					if (this.businessTypeId == 4) {
						val = (this.num(this.loanAmount) + this.num(this.collectedAmount) - this.num(this.totalFee) - this.num(this.xzzDiscountAmount) + this.num(this.carDealerCollectionFee)).toFixed(2);
					} else {
						val = (this.num(this.loanAmount) + this.num(this.collectedAmount) - this.num(this.totalFee) - this.num(this.discountCarPolicy) + this.num(this.carDealerCollectionFee)).toFixed(2);
					}
				}
				return val;
			},
			testedRepaymentAmount: function testedRepaymentAmount() {
				var val = 0,
					loanTerm = [null, 12, 18, 24, 36, 48,60][this.loanTerm];
				if (this.businessTypeId == 4) {
					val = (this.num(this.loanAmount)  + this.num(this.fusePurchaseTaxFee) + this.num(this.fuseGpsFee) + this.num(this.fuseInsuranceFee) )* (this.num(this.handingFee) / 100 + 1) / loanTerm;
				} else {
					val = ((this.num(this.loanAmount)  + this.num(this.fusePurchaseTaxFee) + this.num(this.fuseGpsFee) + this.num(this.fuseInsuranceFee) ) * (this.num(this.handingFee) / 100 + 1) - this.num(this.discountCarPolicy)) / loanTerm;
				}
				return val.toFixed(2);
			},
			discountCarPolicy: function discountCarPolicy() {
				//车商贴息政策=贴息金额-贴息差额；
				var val = this.num(this.discountAmount) - this.num(this.discountMargin);
				if (val < 0) {
					tip({ content: "贴息差额不能大于贴息金额!" });
				}
				return val > 0 ? val.toFixed(2) : 0;
			},
			receivableAmount: function(){
				var val;
				if(this.businessTypeId == 2){
					val = this.num(this.totalFee).toFixed(2);
				}else{
					val = (this.num(this.loanAmount) + this.num(this.collectedAmount) - this.num(this.totalFee)).toFixed(2);
				}
				return val;
			}
		},
		methods: {
			num: function num(_num) {
				return _num * 1 || 0;
			},
			hasItem: function hasItem() {
				var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
				if(args['currentNodeKey'] || args['releventFlowNode']){
					var result = arr.indexOf(args['currentNodeKey'] || args['releventFlowNode']);
					if (result != -1) {
						return false;
					}
				}
				return true;
			},
			payApply: function hasInfrance(){
				var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
				if(args['currentNodeKey'] || args['releventFlowNode']){
					var result = arr.indexOf(args['currentNodeKey'] || args['releventFlowNode']);
					if (result != -1) {
						return true;
					}
				}
				return false;
			},
			saveBudget: function saveBudget(callback) {
				var _this = this;
				if($("#approvalBudgetInfoForm").valid()){
					var o = $("#approvalBudgetInfoForm").values();
					if(o['gpsNumber'] && o['gpsNumber'] != 0 && !o['gpsProducer']){
						return tip({content: '请选择gps厂家! '});
					}
					if(o['gpsProducer']){
						o['gpsProducer'] = o['gpsProducer'].join(",");
					}
					if(o['paymentMethod'] == 1 && _this.num(o['collectedAmount']) != this.num(o['totalFee'])){
						tip({content: '全额打款时,已收费用和费用合计须保持一致! '})
						return;
					}
					o['loanApplyId'] = args['loanApplyId'];
					if(o['gpsNumber'] == 0){
						o.gpsProducer = '';
						o.gpsType = 0;
					}
					if($('input[name=loanType]').val() == 7 && args['currentNodeKey'] == 'LOAN_FINANCE_EXECUTIVE'){
						o.isFuseLoanFund = 1;
					}
					$("#isChange").val("saved");
					comn.ajax({
						url: interUrl.myTask.saveBudgetInfo,
						data: o,
						success: function success(res) {
							tip({content: '保存成功! '});
							if(typeof(callback) == "function"){ callback(); }
						}
					});
				}
			},
			print: function print() {
				window.open("../../../Modal/task/myTask/print.html?loanApplyId=" + args['loanApplyId']);
			},
			getExpressCompanyCode: function getExpressCompanyCode(){
				var _this = this;
				comn.ajax({
					url: interUrl.gr.expressCompanyCode,
					data: {
						codeType: "GpsFactory"
					},
					success: function(res){
						var arr = [];
						for (var i = 0, len = res.data.length; i < len; i++) {
							var item = res.data[i];
							arr.push({
								name: item.codeName,
								val: item.codeName
							});
						}
						_this.$set('gpsProducerArr', arr);
						setTimeout( function(){
							$('#gpsFactory').selectpicker('render')
							if(_this.gpsProducer){
								$('#gpsFactory').selectpicker('val', _this.gpsProducer.split(","));
							}
						}, 100);
					}
				})
			},
			//判断是否车信贷,车信贷去掉滴滴业务，银行利差，提车方式、付款等级、结算方式字段
			showCreditInfo: function () {
				comn.ajax({
					url: interUrl.loanDetail.getLoanFeeInfoInfoQuery,
					data: {
						projectId: args['projectId'],
					},
					success: function (res) {
                        // 微众预算单移除
                        $("#weiBank_money").remove();
						if(res.data.loanType == 8){
							$("input[name='isDidi']").eq(0).parent().parent().parent().parent().addClass('hide');
							$("input[name='coBankName']").eq(1).parent().parent().parent().children('label').html('&nbsp;合作机构:');
							$("input[name='bankIrsFee']").eq(0).parent().parent().parent().addClass('hide');
							$("select[name='deliveryMethod']").eq(0).parent().parent().addClass('hide');
							$("select[name='paymentLevel']").eq(0).parent().parent().addClass('hide');
							$("select[name='settleMethod']").eq(0).parent().parent().addClass('hide');
						}else if(res.data.loanType == 9) {//如果是微车贷
                            $("#weiBank_money").values(res.data);
							// 通用预算单移除
							$("#common_money").remove();
						}
					}
				});                    
			}		
		},
		watch: {
			gpsNumber: function gpsNumber(e) {
				this.GPS = e == "1" || e == "2" ? true : false;
				if (!this.GPS) {
					this.gpsType = "";
					this.gpsProducer = "";
					this.gpsInstallationFee = "";
					this.liabilityAmount = "";
				}
			},
			premiumType: function premiumType(e) {
				var _this = this;
				if (e == 1 && !_this.insuranceCompanyArr) {
					comn.ajax({
						url: interUrl.common.insuranceList,
						success: function success(res) {
							var arr = [{ name: '--请选择--', val: '' }];
							for (var i = 0, len = res.data.length; i < len; i++) {
								var o = res.data[i];
								arr.push({
									name: o.insuranceCompanyName,
									val: o.id
								});
							}
							_this.$set('insuranceCompanyArr', arr);
							// _this.insuranceCompanyId = "";
						}
					});
				}
			}
		},
		events: {
			change: function change(name, $el) {
				switch (name) {
					case 'customerSource':
						break;
				}
			}
		},
		ready: function ready() {
			var _this = this;
			this.downPaymentAmount = this.downPaymentAmount;
			this.loanRatio = this.loanRatio;
			this.preCollectedAmount = this.preCollectedAmount;
			this.payableAmount = this.payableAmount;
			this.testedRepaymentAmount = this.testedRepaymentAmount;
			this.discountCarPolicy = this.discountCarPolicy;

			this.isNoArr = ['', '是', '否'];
			this.loanTermArr = ['', '12期', '18期', '24期', '36期', '48期', '60期'];

			var _data = {},
				_url = "";
			if (args["businessTypeCode"] == "DOCUMENT_TRANSMIT_FLOW") {
				_url = interUrl.myTask.getDocBudgetInfo;
				_data['projectId'] = args['projectId'];
			} else {
				_url = interUrl.myTask.approvalBudgetInfo;
				_data['loanApplyId'] = args['loanApplyId'];
			}

			loadData(_url, _data, function (o) {
				if (_this.businessTypeId == 2) {
					_this.payableAmountLabel = "应收金额";
				}
				_this.getExpressCompanyCode();
			});

			//判断是否车信贷，是的话删除一些字段
			if(args['projectId']) {
				this.showCreditInfo();
			}
		},
	});

	$("form").submit(function (e) {
		e.preventDefault();
	}).validate();
})();
$('#approvalBudgetInfoForm').on("change", "input, select", function(){
	$("#isChange").val("change");
});