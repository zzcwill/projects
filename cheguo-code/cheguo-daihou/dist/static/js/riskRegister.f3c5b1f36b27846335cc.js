webpackJsonp([3],{0:function(e,t){},"3MYD":function(e,t,a){"use strict";var r={name:"",props:{span:{},colMd:{default:24,type:Number},colXs:{default:24,type:Number},colSm:{default:24,type:Number},colLg:{default:24,type:Number}},data:function(){return{}},methods:{handleSearch:function(){this.$emit("search")},handleResetForm:function(){this.$emit("reset")}}},l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"btn-search-group"},[a("el-col",{staticStyle:{"margin-bottom":"20px","text-align":"center"},attrs:{sapn:e.span,md:e.colMd,xs:e.colXs,sm:e.colSm,lg:e.colLg}},[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-error"},on:{click:e.handleResetForm}},[e._v("清除查询条件")])],1)],1)},o=[],s={render:l,staticRenderFns:o},i=s,n=a("VU/8"),c=n(r,i,!1,null,null,null);t.a=c.exports},ABj6:function(e,t,a){"use strict";var r=a("sYoA"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{attrs:{data:e.tableData,dataLoad:e.dataLoad,height:e.tableHeight,stripe:e.stripe,border:e.border,size:e.size,"max-height":e.maxHeight,"show-header":e.showHeader,"empty-text":e.emptyText,params:e.params,url:e.url},on:{"row-click":e.handleRowClick,"selection-change":e.handleSelectionChange}},[e.checkBox?a("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),e._v(" "),e._l(e.columns,function(t){return[t.operations?a("el-table-column",{attrs:{label:t.label,align:t.align},scopedSlots:e._u([{key:"default",fn:function(r){return[t.operations.length>1?a("el-dropdown",{attrs:{trigger:"click","show-timeout":100},on:{command:e.handleCommand}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v(e._s(t.label)),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(t.operations,function(t,l){return a("el-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:e.isShow(t.conditions,r.row),expression:"isShow(operate.conditions,scope.row)"}],key:t.label,attrs:{command:{type:t.command,item:r.row,index:r.$index}}},[e._v(e._s(t.label))])}))],1):a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isShow(t.operations[0].conditions,r.row),expression:"isShow(column.operations[0].conditions,scope.row)"}],attrs:{size:"mini",type:"primary"},on:{click:function(e){t.operations[0].func(r.row,r.$index)}}},[e._v(e._s(t.operations[0].label))])]}}])}):a("el-table-column",{key:t.prop,attrs:{label:t.label,prop:t.prop,fixed:t.fixed,width:t.width,sortable:t.sortable,formatter:t.formatter,"class-name":t.className,"sort-method":t.sortMethod,align:t.align}})]})],2),e._v(" "),a("div",{staticStyle:{"margin-top":"20px"}}),e._v(" "),e.isPage&&e.total>e.tbPageSize?a("el-row",[a("el-col",{attrs:{md:6}}),e._v(" "),a("el-col",{attrs:{md:18,offset:e.offset}},[a("el-pagination",{attrs:{"prev-text":e.prevText,"next-text":e.nextText,"current-page":e.tbCurrentPage,"page-size":e.tbPageSize,"page-sizes":[10,25,50,100,500,1e3],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)},o=[],s={render:l,staticRenderFns:o},i=s,n=a("VU/8"),c=n(r.a,i,!1,null,null,null);t.a=c.exports},MZCK:function(e,t,a){"use strict";function r(e,t){if("object"!==(void 0===t?"undefined":F()(t)))return l(e,{message:"参数异常"});var a=_()(t);n(e,"cooperation/codeLibrary/list",{codeTypes:a}).then(function(r){a.forEach(function(a){var l=t[a],o="",s=r.data[a].map(function(e){return o=isNaN(e.codeId)?e.codeId:Number(e.codeId),{label:e.codeName,value:o}});s.unshift({label:"全部",value:""}),e[l]=s})})}function l(e,t){e.$message({type:t.type||"success",center:t.center||!0,duration:t.duration||2e3,message:t.message||"操作成功",customClass:t.customClass||"messageTip"})}function o(e){if(e.href)return window.parent.menuItemClick.call(e)}function s(){window.parent.closeTab()}function i(){var e,t,a,r,l,o,s;for(o=location.search.length>0?location.search.substring(1):"",r=o.length?o.split("&"):[],e={},t=0;t<r.length;)a=r[t].split("="),l=decodeURIComponent(a[0]),s=decodeURIComponent(a[1]),l.length&&(e[l]=s),t++;return e}function n(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"post";return new g.a(function(o,s){e.$http[r]("/api/"+t,a).then(function(a){var r=a.data;if(2e4===r.code)l(e,{type:"error",message:r.message||t+" 接口异常！！！"}),s();else{if(3e4===r.code)return window.parent.location.href="../../../index.html";"string"==typeof r&&(r=JSON.parse(a.data)),o(r)}})})}function c(e){e.$http.get("/api/getSystemName").then(function(e){var t=e.data,a="gray-bg";"string"==typeof e.data&&(t=JSON.parse(e.data)),1e4===t.code&&(a="shengan"===t.data.systemName?"gray-bg styleCR":"cherong"===t.data.systemName?"gray-bg styleCRW":"gray-bg",document.getElementsByClassName("gray-bg")[0].className=a)}).catch(function(e){console.log("404 Not Found")})}function d(e,t){n(e,"org/list").then(function(a){var r=a.data.module,l=r.map(function(e,t){return{label:e.name,value:e.id}});l.unshift({label:"全部",value:""}),e[t]=l}).catch(function(t){e.$message({message:"接口 org/list 未找到",type:"error",center:"true",duration:2e3})})}function u(e,t){n(e,"cooperation/bank/all").then(function(a){var r=a.data,l=r.map(function(e,t){return{label:e.bankName,value:e.id}});l.unshift({label:"全部",value:""}),e[t]=l}).catch(function(t){e.$message({message:"接口 cooperation/bank/all 未找到",type:"error",center:"true",duration:2e3})})}function m(e,t){n(e,"complaint/configList").then(function(a){var r=a.data,l=r.map(function(e,t){return{label:e.reason,value:e.id}});l.unshift({label:"全部",value:""}),e[t]=l}).catch(function(t){l(e,{type:"error",message:"接口 complaint/configList 未找到"})})}function p(e,t,a){if(t)return n(e,"complaint/configList").then(function(r){var l=r.data,o=l.filter(function(e,a){return e.id==t});e[a]=o[0].complaintType}).catch(function(){l(e,{type:"error",message:"接口 complaint/configList 未找到"})})}function f(e,t){n(e,"gps/getSupplierList").then(function(a){var r=a.data,l=r.map(function(e){return{label:e.supplierName,value:e.supplierId}});l.unshift({label:"全部",value:""}),e[t]=l}).catch(function(){})}t.d=r,t.l=l,t.b=o,t.c=s,t.f=i,t.a=n,t.k=c,t.i=d,t.e=u,t.g=m,t.h=p,t.j=f;var b=a("//Fk"),g=a.n(b),h=a("fZjL"),_=a.n(h),v=a("pFYg"),F=a.n(v)},aBTM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("7+uW"),l=a("zL8q"),o=a.n(l),s=a("8+8L"),i=(a("tvR6"),a("gVu1"),a("fZjL")),n=a.n(i),c=a("woOf"),d=a.n(c),u=a("pa0c"),m=a("wi0O"),p=a("ABj6"),f=a("3MYD"),b=a("MZCK"),g={name:"",components:{"cd-input":u.a,"cd-select":m.a,"cd-table":p.a,"cd-search-button":f.a},data:function(){return{type:1,id:"",customerParams:{},customerForm:{customerName:"",mobilePhone:"",cardNo:""},customerDialog:!1,tableParams:{},columns:[{label:"客户",prop:"customerName"},{label:"身份证",prop:"cardNo"},{label:"证件类型",prop:"cardType",formatter:function(e,t,a){return["","身份证","军官证","侨胞证","外籍人士"][a]}},{label:"项目编号",prop:"projectNo"},{label:"客户经理",prop:"launchUserName"},{label:"手机号码",prop:"mobilePhone"},{label:"操作",operations:[{label:"选择",func:this.addCustomer}]}],detailForm:{cardType:"",cardNo:"",loanTermString:"",loanTerm:"",loanType:"",bankPaymentDate:"",loanAmount:"",bankPaymentAmount:"",userGroupName:"",launchUserName:"",riskManagerName:"",carModelName:"",carType:"",billingPrice:"",plateNo:"",mortgageTime:"",isDragCar:"",isFee:"",isSettlement:"",isManger:"",lawsuitType:"",lawsuitDate:""},registerForm:{cardType:"",cardNo:"",coBankId:"",coBankName:"",launchOrgId:"",launchOrgName:"",customerName:"",customerId:"",projectNo:"",projectId:"",status:"",justification:"",companyFeedback:"",overdueType:"",riskType:""},registerRule:{coBankId:[{required:!0,message:"合作银行必填"}],launchOrgId:[{required:!0,message:"分公司必填"}],customerName:[{required:!0,message:"客户姓名必填"}],justification:[{required:!0,message:"核查缘由必填"}],companyFeedback:[{required:!0,message:"反馈内容必填"}],riskType:[{required:!0,message:"风险类型必填"}],overdueType:[{required:!0,message:"名单制类型必填"}]},coBank:[],orgList:[],loanType:[{label:"车主贷",value:5},{label:"车价贷",value:6},{label:"易融贷",value:7}],cardType:[{label:"身份证",value:1},{label:"军官证",value:2},{label:"侨胞证",value:3},{label:"外籍人士",value:4}],carType:[{label:"新车",value:1},{label:"二手车",value:2}],dealResult:[{label:"处理中",value:1},{label:"处理完成",value:2}],lawsuitType:[{label:"公司起诉",value:1},{label:"银行起诉",value:2}],loanTerm:[{label:"12期",value:1},{label:"18期",value:2},{label:"24期",value:3},{label:"36期",value:4}],riskType:[],listType:[]}},methods:{clearCustomer:function(){this.registerForm.customerName="",this.registerForm.customerId="",this.registerForm.cardType="",this.registerForm.cardNo="",this.registerForm.projectNo=""},getBankName:function(e){this.clearCustomer();var t=this.coBank.filter(function(t){return t.value===e});this.registerForm.coBankName=t[0].label},getOrgName:function(e){this.clearCustomer();var t=this.orgList.filter(function(t){return t.value===e});this.registerForm.launchOrgName=t[0].label},chooseCustomer:function(){this.registerForm.coBankId&&this.registerForm.launchOrgId?this.customerDialog=!0:Object(b.l)(this,{type:"warning",message:"请先选择合作银行和分公司"})},openDialog:function(){var e=this;setTimeout(function(){e.customerParams=d()(e.customerForm,{coBankId:e.registerForm.coBankId,launchOrgId:e.registerForm.launchOrgId})},0)},customerSearch:function(){this.customerParams=d()({},this.customerForm,{coBankId:this.registerForm.coBankId,launchOrgId:this.registerForm.launchOrgId})},resetForm:function(){this.$refs.customerForm.resetFields()},addCustomer:function(e,t){var a=this;this.registerForm.customerName=e.customerName,this.registerForm.customerId=e.customerId,this.registerForm.cardType=e.cardType,this.registerForm.cardNo=e.cardNo,this.registerForm.projectNo=e.projectNo,this.registerForm.projectId=e.projectId,this.customerDialog=!1,n()(this.detailForm).map(function(e){a.detailForm[e]=""}),Object(b.a)(this,"riskProfile/projectDetail",{id:this.registerForm.projectId}).then(function(e){a.detailForm=e.data})},close:function(){Object(b.c)()},save:function(){var e=this;this.$refs.registerForm.validate().then(function(){Object(b.a)(e,"riskProfile/addRiskProfile",d()({},e.registerForm,e.detailForm,{id:e.id||""})).then(function(){Object(b.l)(e,{message:"保存成功"}),Object(b.c)()}).catch(function(){})}).catch(function(){})},dealFinish:function(){var e=this;this.$refs.registerForm.validate().then(function(){Object(b.a)(e,"riskProfile/managerUpdate",{id:e.id||"",status:e.registerForm.status,companyFeedback:e.registerForm.companyFeedback}).then(function(){Object(b.l)(e,{message:"处理成功"}),Object(b.c)()}).catch(function(){})})}},mounted:function(){var e=this;if(Object(b.k)(this),Object(b.e)(this,"coBank"),Object(b.i)(this,"orgList"),this.type=Object(b.f)().type,this.id=Object(b.f)().id,this.id||Object(b.f)().projectId){var t=Object(b.f)().projectId?"riskProfile/projectDetail":"riskProfile/detail",a=Object(b.f)().projectId||this.id;Object(b.a)(this,t,{id:a}).then(function(t){var a=t.data;n()(e.detailForm).map(function(t){e.detailForm[t]=a[t]}),n()(e.registerForm).map(function(t){e.registerForm[t]=a[t]})})}Object(b.d)(this,{riskType:"riskType",overdueType:"listType"})}},h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox"},[a("div",{staticClass:"ibox-content"},[a("el-row",{attrs:{gutter:20}},[a("el-form",{ref:"registerForm",attrs:{model:e.registerForm,"label-width":"80px",size:"small",rules:e.registerRule}},[a("el-col",{attrs:{span:24}},[a("cd-select",{attrs:{label:"合作银行:",prop:"coBankId",options:e.coBank,offset:1,disabled:1!=e.type,"label-width":"90px"},on:{selectChange:e.getBankName},model:{value:e.registerForm.coBankId,callback:function(t){e.$set(e.registerForm,"coBankId",t)},expression:"registerForm.coBankId"}}),e._v(" "),a("cd-select",{attrs:{label:"分公司:",prop:"launchOrgId",options:e.orgList,disabled:1!=e.type},on:{selectChange:e.getOrgName},model:{value:e.registerForm.launchOrgId,callback:function(t){e.$set(e.registerForm,"launchOrgId",t)},expression:"registerForm.launchOrgId"}})],1),e._v(" "),a("el-col",{attrs:{sapn:24}},[a("cd-select",{attrs:{label:"名单制类型:","label-width":"90px",disabled:4==e.type||3==e.type,prop:"overdueType",options:e.listType,offset:1},model:{value:e.registerForm.overdueType,callback:function(t){e.$set(e.registerForm,"overdueType",t)},expression:"registerForm.overdueType"}}),e._v(" "),a("cd-select",{attrs:{label:"风险类型:",disabled:4==e.type||3==e.type,prop:"riskType",options:e.riskType},model:{value:e.registerForm.riskType,callback:function(t){e.$set(e.registerForm,"riskType",t)},expression:"registerForm.riskType"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"客户姓名:",placeholder:"请输入客户姓名",prop:"customerName",disabled:!0,appendSlot:"true",offset:1},model:{value:e.registerForm.customerName,callback:function(t){e.$set(e.registerForm,"customerName",t)},expression:"registerForm.customerName"}},[a("el-button",{attrs:{slot:"appendSlot",type:"primary",size:"small",disabled:1!=e.type},on:{click:e.chooseCustomer},slot:"appendSlot"},[e._v("\n                选择\n              ")])],1),e._v(" "),a("cd-select",{attrs:{label:"证件类型:",placeholder:"请输入证件类型",disabled:!0,options:e.cardType},model:{value:e.registerForm.cardType,callback:function(t){e.$set(e.registerForm,"cardType",t)},expression:"registerForm.cardType"}}),e._v(" "),a("cd-input",{attrs:{label:"证件号码:",placeholder:"请输入证件号码",disabled:!0},model:{value:e.registerForm.cardNo,callback:function(t){e.$set(e.registerForm,"cardNo",t)},expression:"registerForm.cardNo"}})],1),e._v(" "),a("el-form",{ref:"detailForm",attrs:{model:e.detailForm,size:"small","label-width":"80px"}},[a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"贷款编号:",placeholder:"请输入贷款编号",disabled:!0,offset:1},model:{value:e.registerForm.projectNo,callback:function(t){e.$set(e.registerForm,"projectNo",t)},expression:"registerForm.projectNo"}}),e._v(" "),a("cd-select",{attrs:{label:"贷款类型:",placeholder:"请输入贷款类型",options:e.loanType,disabled:!0},model:{value:e.detailForm.loanType,callback:function(t){e.$set(e.detailForm,"loanType",t)},expression:"detailForm.loanType"}}),e._v(" "),a("cd-select",{attrs:{label:"期数:",placeholder:"请输入期数",options:e.loanTerm,disabled:!0},model:{value:e.detailForm.loanTerm,callback:function(t){e.$set(e.detailForm,"loanTerm",t)},expression:"detailForm.loanTerm"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7,offset:1}},[a("el-form-item",{attrs:{label:"放款时间:"}},[a("el-date-picker",{attrs:{placeholder:"请输入放款时间",type:"date",disabled:!0},model:{value:e.detailForm.bankPaymentDate,callback:function(t){e.$set(e.detailForm,"bankPaymentDate",t)},expression:"detailForm.bankPaymentDate"}})],1)],1),e._v(" "),a("cd-input",{attrs:{label:"放款金额:",placeholder:"请输入放款金额",disabled:!0},model:{value:e.detailForm.bankPaymentAmount,callback:function(t){e.$set(e.detailForm,"bankPaymentAmount",t)},expression:"detailForm.bankPaymentAmount"}}),e._v(" "),a("cd-input",{attrs:{label:"贷款金额:",placeholder:"请输入贷款金额",disabled:!0},model:{value:e.detailForm.loanAmount,callback:function(t){e.$set(e.detailForm,"loanAmount",t)},expression:"detailForm.loanAmount"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"业务组:",placeholder:"请输入业务组",disabled:!0,offset:1},model:{value:e.detailForm.userGroupName,callback:function(t){e.$set(e.detailForm,"userGroupName",t)},expression:"detailForm.userGroupName"}}),e._v(" "),a("cd-input",{attrs:{label:"客户经理:",placeholder:"请输入客户经理",disabled:!0},model:{value:e.detailForm.launchUserName,callback:function(t){e.$set(e.detailForm,"launchUserName",t)},expression:"detailForm.launchUserName"}}),e._v(" "),a("cd-input",{attrs:{label:"风险经理:",placeholder:"请输入风险经理",disabled:!0},model:{value:e.detailForm.riskManagerName,callback:function(t){e.$set(e.detailForm,"riskManagerName",t)},expression:"detailForm.riskManagerName"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"营销品牌:",placeholder:"请输入营销品牌",disabled:!0,offset:1},model:{value:e.detailForm.carModelName,callback:function(t){e.$set(e.detailForm,"carModelName",t)},expression:"detailForm.carModelName"}}),e._v(" "),a("cd-select",{attrs:{label:"汽车类型:",disabled:!0,options:e.carType},model:{value:e.detailForm.carType,callback:function(t){e.$set(e.detailForm,"carType",t)},expression:"detailForm.carType"}}),e._v(" "),a("cd-input",{attrs:{label:"开票价:",placeholder:"请输入开票价",disabled:!0},model:{value:e.detailForm.billingPrice,callback:function(t){e.$set(e.detailForm,"billingPrice",t)},expression:"detailForm.billingPrice"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"车牌号:",placeholder:"请输入车牌号",disabled:!0,offset:1},model:{value:e.detailForm.plateNo,callback:function(t){e.$set(e.detailForm,"plateNo",t)},expression:"detailForm.plateNo"}}),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"抵押时间:"}},[a("el-date-picker",{attrs:{placeholder:"请输入抵押时间",type:"date",disabled:!0,"value-format":"yyyy-MM-dd"},model:{value:e.detailForm.mortgageTime,callback:function(t){e.$set(e.detailForm,"mortgageTime",t)},expression:"detailForm.mortgageTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"是否拖车:"}},[a("el-radio-group",{model:{value:e.detailForm.isDragCar,callback:function(t){e.$set(e.detailForm,"isDragCar",t)},expression:"detailForm.isDragCar"}},[a("el-radio",{attrs:{label:1,disabled:!0}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0,disabled:!0}},[e._v("否")])],1)],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7,offset:1}},[a("el-form-item",{attrs:{label:"是否垫款:"}},[a("el-radio-group",{attrs:{disabled:!0},model:{value:e.detailForm.isFee,callback:function(t){e.$set(e.detailForm,"isFee",t)},expression:"detailForm.isFee"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"是否结清:"}},[a("el-radio-group",{attrs:{disabled:!0},model:{value:e.detailForm.isSettlement,callback:function(t){e.$set(e.detailForm,"isSettlement",t)},expression:"detailForm.isSettlement"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"是否处置:"}},[a("el-radio-group",{attrs:{disabled:!0},model:{value:e.detailForm.isManger,callback:function(t){e.$set(e.detailForm,"isManger",t)},expression:"detailForm.isManger"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-select",{attrs:{label:"诉讼类型:",placeholder:"请输入诉讼类型",disabled:!0,offset:1,options:e.lawsuitType},model:{value:e.detailForm.lawsuitType,callback:function(t){e.$set(e.detailForm,"lawsuitType",t)},expression:"detailForm.lawsuitType"}}),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"诉讼日期:"}},[a("el-date-picker",{attrs:{placeholder:"请输入诉讼日期",type:"date",disabled:!0,"value-format":"yyyy-MM-dd"},model:{value:e.detailForm.lawsuitDate,callback:function(t){e.$set(e.detailForm,"lawsuitDate",t)},expression:"detailForm.lawsuitDate"}})],1)],1),e._v(" "),1!=e.type&&3==e.type?a("cd-select",{attrs:{label:"处理结果:",disabled:!0,options:e.dealResult},model:{value:e.registerForm.status,callback:function(t){e.$set(e.registerForm,"status",t)},expression:"registerForm.status"}}):e._e()],1)],1),e._v(" "),a("cd-input",{attrs:{type:"textarea",prop:"justification",rows:4,label:"核查缘由:","col-md":18,"col-xs":18,"col-sm":18,"col-lg":18,offset:1,disabled:3==e.type||4==e.type},model:{value:e.registerForm.justification,callback:function(t){e.$set(e.registerForm,"justification",t)},expression:"registerForm.justification"}}),e._v(" "),1!=e.type&&e.registerForm.companyFeedback||4==e.type?a("cd-input",{attrs:{type:"textarea",prop:"companyFeedback",rows:4,label:"分公司反馈:","col-md":18,"col-xs":18,"col-sm":18,"col-lg":18,offset:1,disabled:4!=e.type},model:{value:e.registerForm.companyFeedback,callback:function(t){e.$set(e.registerForm,"companyFeedback",t)},expression:"registerForm.companyFeedback"}}):e._e(),e._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:21}},[4==e.type&&1==e.registerForm.status?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.dealFinish}},[e._v("处理完成")]):e._e(),e._v(" "),3!=e.type?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.save}},[e._v("保存")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.close}},[e._v("关闭")])],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-dialog",{attrs:{title:"客户选择",width:"80%",visible:e.customerDialog},on:{"update:visible":function(t){e.customerDialog=t},open:e.openDialog}},[a("el-row",{attrs:{gutter:20}},[a("el-form",{ref:"customerForm",attrs:{model:e.customerForm,"label-width":"80px",size:"small"}},[a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"客户名称:",placeholder:"请输入客户名称",prop:"customerName",offset:6},model:{value:e.customerForm.customerName,callback:function(t){e.$set(e.customerForm,"customerName",t)},expression:"customerForm.customerName"}}),e._v(" "),a("cd-input",{attrs:{label:"证件号码:",placeholder:"请输入证件号码",prop:"cardNo"},model:{value:e.customerForm.cardNo,callback:function(t){e.$set(e.customerForm,"cardNo",t)},expression:"customerForm.cardNo"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"手机号码:",placeholder:"请输入手机号码",prop:"mobilePhone",offset:6},model:{value:e.customerForm.mobilePhone,callback:function(t){e.$set(e.customerForm,"mobilePhone",t)},expression:"customerForm.mobilePhone"}})],1),e._v(" "),a("cd-search-button",{on:{search:e.customerSearch,reset:e.resetForm}})],1),e._v(" "),a("cd-table",{attrs:{columns:e.columns,params:e.customerParams,url:"riskProfile/postLoanCustomerList"}})],1)],1)],1)],1)])},_=[],v={render:h,staticRenderFns:_},F=v,y=a("VU/8"),k=y(g,F,!1,null,null,null),x=k.exports;r.default.use(o.a),r.default.use(s.a),r.default.http.options.emulateJSON=!0,new r.default({el:"#riskRegister",template:"<risk-register></risk-register>",components:{riskRegister:x}})},dS7c:function(e,t,a){"use strict";a("zNUS")},gVu1:function(e,t){},pa0c:function(e,t,a){"use strict";var r={name:"",props:{prop:{},required:{},colspan:{default:7},colMd:{default:7},colXs:{default:7},colSm:{default:7},colLg:{default:7},offset:{},label:{},placeholder:{},maxlength:{},minlength:{},size:{},prefixIcon:{},suffixIcon:{},rows:{},type:{},disabled:{default:!1,type:Boolean},readonly:{default:!1,type:Boolean},inputClass:{},inputId:{},inputRef:{},value:{},prependSlot:{},appendSlot:{},labelWidth:{}},data:function(){return{}},methods:{handleChange:function(e){this.$emit("inputChange",e)},handleBlur:function(e){this.$emit("inputBlur",e)},handleFocus:function(e){this.$emit("inputFocus",e)}}},l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-col",{attrs:{span:e.colspan,md:e.colMd,xs:e.colXs,lg:e.colLg,offset:e.offset}},[a("el-form-item",{attrs:{label:e.label,prop:e.prop,required:e.required,"label-width":e.labelWidth}},[a("el-input",{ref:e.inputRef,class:e.inputClass,attrs:{value:e.value,type:e.type,disabled:e.disabled,readonly:e.readonly,placeholder:e.placeholder,maxlength:e.maxlength,minlength:e.minlength,size:e.size,"prefix-icon":e.prefixIcon,"suffix-icon":e.suffixIcon,rows:e.rows,id:e.inputId},on:{input:function(t){e.$emit("input",t)},change:e.handleChange,blur:e.handleBlur,focus:e.handleFocus}},[e.prependSlot?a("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._t("prependSlot")],2):e._e(),e._v(" "),e.appendSlot?a("div",{attrs:{slot:"append"},slot:"append"},[e._t("appendSlot")],2):e._e()])],1)],1)],1)},o=[],s={render:l,staticRenderFns:o},i=s,n=a("VU/8"),c=n(r,i,!1,null,null,null);t.a=c.exports},sYoA:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__=__webpack_require__("woOf"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__),__WEBPACK_IMPORTED_MODULE_1__common_js_iframe__=__webpack_require__("MZCK"),__WEBPACK_IMPORTED_MODULE_2__common_js_mockData__=__webpack_require__("dS7c");__webpack_exports__.a={name:"mTable",props:{tableRef:"",params:{},url:{},dataLoad:{},columns:{},offset:{default:8},tableHeight:{},maxHeight:{default:600},stripe:{default:!0},border:{default:!0},showHeader:{default:!0},emptyText:{default:"暂无数据"},size:{},fields:{},formatter:{default:!1},checkBox:{default:!1},isPage:{default:!0,type:Boolean},prevText:{default:"上一页"},nextText:{default:"下一页"},rowClick:{}},data:function(){return{tbCurrentPage:1,tbPageSize:10,tableData:[],total:0}},components:{},methods:{handleSizeChange:function(e){this.pageData(this.tbCurrentPage,e)},handleCurrentChange:function(e){this.pageData(e,this.tbPageSize)},handleCommand:function(e){this.$emit("operation",e)},handleSelectionChange:function(e){this.$emit("selectionChange",e)},handleRowClick:function(e,t,a){this.$emit("rowClick",e,t,a)},pageData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,a=this;if(this.url){this._data.tbPageSize=t,this._data.tbCurrentPage=e;var r=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({},this.params,{page:e,pageSize:t});Object(__WEBPACK_IMPORTED_MODULE_1__common_js_iframe__.a)(this,this.url,r).then(function(e){a._data.tableData=e.data,a._data.total=e.totalItem}).catch(function(){})}else this._data.tableData=this.dataLoad,this._data.total=this.dataLoad.length},isShow:function isShow(conditions,row){return!conditions||conditions.every(function(item){var judge="==";return item.judge&&"="!=item.judge&&(judge=item.judge),eval(row[item.condition]+judge+item.value)})}},watch:{params:function(e){this.pageData(1,this.tbPageSize)},url:function(e){this.pageData(this.tbCurrentPage,this.tbPageSize)},dataLoad:function(e){this.url||this.pageData()}},mounted:function(){}}},tvR6:function(e,t){},tvkE:function(e,t){},wi0O:function(e,t,a){"use strict";function r(e){a("tvkE")}var l={name:"",props:{prop:{},options:{type:Array},label:{},labelWidth:{},value:"",colSpan:{},colLg:{default:7,type:Number},colMd:{default:7,type:Number},colSm:{default:7,type:Number},colXs:{default:7,type:Number},offset:{},multiple:{default:!1},disabled:{default:!1},size:{},placeholder:{default:"请选择"}},data:function(){return{}},components:{},methods:{change:function(e){this.$emit("input",e)},handleChange:function(e){this.$emit("selectChange",e)},handleRemove:function(e){this.$emit("removeTag",e)}},mounted:function(){}},o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"cd_select"}},[a("el-col",{attrs:{span:e.colSpan,md:e.colMd,xs:e.colXs,sm:e.colSm,lg:e.colLg,offset:e.offset}},[a("el-form-item",{attrs:{label:e.label,prop:e.prop,"label-width":e.labelWidth}},[a("el-select",{attrs:{value:e.value,multiple:e.multiple,disabled:e.disabled,size:e.size,placeholder:e.placeholder,filterable:""},on:{input:function(t){e.change(t)},change:e.handleChange,"remove-tag":e.handleRemove}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1)},s=[],i={render:o,staticRenderFns:s},n=i,c=a("VU/8"),d=r,u=c(l,n,!1,d,null,null);t.a=u.exports}},["aBTM"]);
//# sourceMappingURL=riskRegister.f3c5b1f36b27846335cc.js.map