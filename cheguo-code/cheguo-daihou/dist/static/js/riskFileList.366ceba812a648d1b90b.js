webpackJsonp([4],{0:function(e,t){},"3MYD":function(e,t,a){"use strict";var o={name:"",props:{span:{},colMd:{default:24,type:Number},colXs:{default:24,type:Number},colSm:{default:24,type:Number},colLg:{default:24,type:Number}},data:function(){return{}},methods:{handleSearch:function(){this.$emit("search")},handleResetForm:function(){this.$emit("reset")}}},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"btn-search-group"},[a("el-col",{staticStyle:{"margin-bottom":"20px","text-align":"center"},attrs:{sapn:e.span,md:e.colMd,xs:e.colXs,sm:e.colSm,lg:e.colLg}},[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-error"},on:{click:e.handleResetForm}},[e._v("清除查询条件")])],1)],1)},r=[],l={render:n,staticRenderFns:r},i=l,s=a("VU/8"),c=s(o,i,!1,null,null,null);t.a=c.exports},ABj6:function(e,t,a){"use strict";var o=a("sYoA"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{attrs:{data:e.tableData,dataLoad:e.dataLoad,height:e.tableHeight,stripe:e.stripe,border:e.border,size:e.size,"max-height":e.maxHeight,"show-header":e.showHeader,"empty-text":e.emptyText,params:e.params,url:e.url},on:{"row-click":e.handleRowClick,"selection-change":e.handleSelectionChange}},[e.checkBox?a("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),e._v(" "),e._l(e.columns,function(t){return[t.operations?a("el-table-column",{attrs:{label:t.label,align:t.align},scopedSlots:e._u([{key:"default",fn:function(o){return[t.operations.length>1?a("el-dropdown",{attrs:{trigger:"click","show-timeout":100},on:{command:e.handleCommand}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v(e._s(t.label)),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(t.operations,function(t,n){return a("el-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:e.isShow(t.conditions,o.row),expression:"isShow(operate.conditions,scope.row)"}],key:t.label,attrs:{command:{type:t.command,item:o.row,index:o.$index}}},[e._v(e._s(t.label))])}))],1):a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isShow(t.operations[0].conditions,o.row),expression:"isShow(column.operations[0].conditions,scope.row)"}],attrs:{size:"mini",type:"primary"},on:{click:function(e){t.operations[0].func(o.row,o.$index)}}},[e._v(e._s(t.operations[0].label))])]}}])}):a("el-table-column",{key:t.prop,attrs:{label:t.label,prop:t.prop,fixed:t.fixed,width:t.width,sortable:t.sortable,formatter:t.formatter,"class-name":t.className,"sort-method":t.sortMethod,align:t.align}})]})],2),e._v(" "),a("div",{staticStyle:{"margin-top":"20px"}}),e._v(" "),e.isPage&&e.total>e.tbPageSize?a("el-row",[a("el-col",{attrs:{md:6}}),e._v(" "),a("el-col",{attrs:{md:18,offset:e.offset}},[a("el-pagination",{attrs:{"prev-text":e.prevText,"next-text":e.nextText,"current-page":e.tbCurrentPage,"page-size":e.tbPageSize,"page-sizes":[10,25,50,100,500,1e3],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)},r=[],l={render:n,staticRenderFns:r},i=l,s=a("VU/8"),c=s(o.a,i,!1,null,null,null);t.a=c.exports},MZCK:function(e,t,a){"use strict";function o(e,t){if("object"!==(void 0===t?"undefined":y()(t)))return n(e,{message:"参数异常"});var a=g()(t);s(e,"cooperation/codeLibrary/list",{codeTypes:a}).then(function(o){a.forEach(function(a){var n=t[a],r="",l=o.data[a].map(function(e){return r=isNaN(e.codeId)?e.codeId:Number(e.codeId),{label:e.codeName,value:r}});l.unshift({label:"全部",value:""}),e[n]=l})})}function n(e,t){e.$message({type:t.type||"success",center:t.center||!0,duration:t.duration||2e3,message:t.message||"操作成功",customClass:t.customClass||"messageTip"})}function r(e){if(e.href)return window.parent.menuItemClick.call(e)}function l(){window.parent.closeTab()}function i(){var e,t,a,o,n,r,l;for(r=location.search.length>0?location.search.substring(1):"",o=r.length?r.split("&"):[],e={},t=0;t<o.length;)a=o[t].split("="),n=decodeURIComponent(a[0]),l=decodeURIComponent(a[1]),n.length&&(e[n]=l),t++;return e}function s(e,t,a){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"post";return new b.a(function(r,l){e.$http[o]("/api/"+t,a).then(function(a){var o=a.data;if(2e4===o.code)n(e,{type:"error",message:o.message||t+" 接口异常！！！"}),l();else{if(3e4===o.code)return window.parent.location.href="../../../index.html";"string"==typeof o&&(o=JSON.parse(a.data)),r(o)}})})}function c(e){e.$http.get("/api/getSystemName").then(function(e){var t=e.data,a="gray-bg";"string"==typeof e.data&&(t=JSON.parse(e.data)),1e4===t.code&&(a="shengan"===t.data.systemName?"gray-bg styleCR":"cherong"===t.data.systemName?"gray-bg styleCRW":"gray-bg",document.getElementsByClassName("gray-bg")[0].className=a)}).catch(function(e){console.log("404 Not Found")})}function u(e,t){s(e,"org/list").then(function(a){var o=a.data.module,n=o.map(function(e,t){return{label:e.name,value:e.id}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(t){e.$message({message:"接口 org/list 未找到",type:"error",center:"true",duration:2e3})})}function d(e,t){s(e,"cooperation/bank/all").then(function(a){var o=a.data,n=o.map(function(e,t){return{label:e.bankName,value:e.id}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(t){e.$message({message:"接口 cooperation/bank/all 未找到",type:"error",center:"true",duration:2e3})})}function p(e,t){s(e,"complaint/configList").then(function(a){var o=a.data,n=o.map(function(e,t){return{label:e.reason,value:e.id}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(t){n(e,{type:"error",message:"接口 complaint/configList 未找到"})})}function m(e,t,a){if(t)return s(e,"complaint/configList").then(function(o){var n=o.data,r=n.filter(function(e,a){return e.id==t});e[a]=r[0].complaintType}).catch(function(){n(e,{type:"error",message:"接口 complaint/configList 未找到"})})}function h(e,t){s(e,"gps/getSupplierList").then(function(a){var o=a.data,n=o.map(function(e){return{label:e.supplierName,value:e.supplierId}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(){})}t.d=o,t.l=n,t.b=r,t.c=l,t.f=i,t.a=s,t.k=c,t.i=u,t.e=d,t.g=p,t.h=m,t.j=h;var f=a("//Fk"),b=a.n(f),_=a("fZjL"),g=a.n(_),v=a("pFYg"),y=a.n(v)},dS7c:function(e,t,a){"use strict";a("zNUS")},gVu1:function(e,t){},pa0c:function(e,t,a){"use strict";var o={name:"",props:{prop:{},required:{},colspan:{default:7},colMd:{default:7},colXs:{default:7},colSm:{default:7},colLg:{default:7},offset:{},label:{},placeholder:{},maxlength:{},minlength:{},size:{},prefixIcon:{},suffixIcon:{},rows:{},type:{},disabled:{default:!1,type:Boolean},readonly:{default:!1,type:Boolean},inputClass:{},inputId:{},inputRef:{},value:{},prependSlot:{},appendSlot:{},labelWidth:{}},data:function(){return{}},methods:{handleChange:function(e){this.$emit("inputChange",e)},handleBlur:function(e){this.$emit("inputBlur",e)},handleFocus:function(e){this.$emit("inputFocus",e)}}},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-col",{attrs:{span:e.colspan,md:e.colMd,xs:e.colXs,lg:e.colLg,offset:e.offset}},[a("el-form-item",{attrs:{label:e.label,prop:e.prop,required:e.required,"label-width":e.labelWidth}},[a("el-input",{ref:e.inputRef,class:e.inputClass,attrs:{value:e.value,type:e.type,disabled:e.disabled,readonly:e.readonly,placeholder:e.placeholder,maxlength:e.maxlength,minlength:e.minlength,size:e.size,"prefix-icon":e.prefixIcon,"suffix-icon":e.suffixIcon,rows:e.rows,id:e.inputId},on:{input:function(t){e.$emit("input",t)},change:e.handleChange,blur:e.handleBlur,focus:e.handleFocus}},[e.prependSlot?a("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._t("prependSlot")],2):e._e(),e._v(" "),e.appendSlot?a("div",{attrs:{slot:"append"},slot:"append"},[e._t("appendSlot")],2):e._e()])],1)],1)],1)},r=[],l={render:n,staticRenderFns:r},i=l,s=a("VU/8"),c=s(o,i,!1,null,null,null);t.a=c.exports},sYoA:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__=__webpack_require__("woOf"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__),__WEBPACK_IMPORTED_MODULE_1__common_js_iframe__=__webpack_require__("MZCK"),__WEBPACK_IMPORTED_MODULE_2__common_js_mockData__=__webpack_require__("dS7c");__webpack_exports__.a={name:"mTable",props:{tableRef:"",params:{},url:{},dataLoad:{},columns:{},offset:{default:8},tableHeight:{},maxHeight:{default:600},stripe:{default:!0},border:{default:!0},showHeader:{default:!0},emptyText:{default:"暂无数据"},size:{},fields:{},formatter:{default:!1},checkBox:{default:!1},isPage:{default:!0,type:Boolean},prevText:{default:"上一页"},nextText:{default:"下一页"},rowClick:{}},data:function(){return{tbCurrentPage:1,tbPageSize:10,tableData:[],total:0}},components:{},methods:{handleSizeChange:function(e){this.pageData(this.tbCurrentPage,e)},handleCurrentChange:function(e){this.pageData(e,this.tbPageSize)},handleCommand:function(e){this.$emit("operation",e)},handleSelectionChange:function(e){this.$emit("selectionChange",e)},handleRowClick:function(e,t,a){this.$emit("rowClick",e,t,a)},pageData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,a=this;if(this.url){this._data.tbPageSize=t,this._data.tbCurrentPage=e;var o=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({},this.params,{page:e,pageSize:t});Object(__WEBPACK_IMPORTED_MODULE_1__common_js_iframe__.a)(this,this.url,o).then(function(e){a._data.tableData=e.data,a._data.total=e.totalItem}).catch(function(){})}else this._data.tableData=this.dataLoad,this._data.total=this.dataLoad.length},isShow:function isShow(conditions,row){return!conditions||conditions.every(function(item){var judge="==";return item.judge&&"="!=item.judge&&(judge=item.judge),eval(row[item.condition]+judge+item.value)})}},watch:{params:function(e){this.pageData(1,this.tbPageSize)},url:function(e){this.pageData(this.tbCurrentPage,this.tbPageSize)},dataLoad:function(e){this.url||this.pageData()}},mounted:function(){}}},tvR6:function(e,t){},tvkE:function(e,t){},wi0O:function(e,t,a){"use strict";function o(e){a("tvkE")}var n={name:"",props:{prop:{},options:{type:Array},label:{},labelWidth:{},value:"",colSpan:{},colLg:{default:7,type:Number},colMd:{default:7,type:Number},colSm:{default:7,type:Number},colXs:{default:7,type:Number},offset:{},multiple:{default:!1},disabled:{default:!1},size:{},placeholder:{default:"请选择"}},data:function(){return{}},components:{},methods:{change:function(e){this.$emit("input",e)},handleChange:function(e){this.$emit("selectChange",e)},handleRemove:function(e){this.$emit("removeTag",e)}},mounted:function(){}},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"cd_select"}},[a("el-col",{attrs:{span:e.colSpan,md:e.colMd,xs:e.colXs,sm:e.colSm,lg:e.colLg,offset:e.offset}},[a("el-form-item",{attrs:{label:e.label,prop:e.prop,"label-width":e.labelWidth}},[a("el-select",{attrs:{value:e.value,multiple:e.multiple,disabled:e.disabled,size:e.size,placeholder:e.placeholder,filterable:""},on:{input:function(t){e.change(t)},change:e.handleChange,"remove-tag":e.handleRemove}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1)},l=[],i={render:r,staticRenderFns:l},s=i,c=a("VU/8"),u=o,d=c(n,s,!1,u,null,null);t.a=d.exports},"z+b3":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("7+uW"),n=a("zL8q"),r=a.n(n),l=a("8+8L"),i=(a("tvR6"),a("gVu1"),a("woOf")),s=a.n(i),c=a("ABj6"),u=a("pa0c"),d=a("wi0O"),p=a("3MYD"),m=a("MZCK"),h={name:"riskFileList",components:{"cd-table":c.a,"cd-input":u.a,"cd-select":d.a,"cd-search-button":p.a},data:function(){return{searchForm:{customerName:"",cardNo:"",projectNo:"",addUser:"",launchOrgId:"",coBankId:"",overdueType:"",riskType:""},columns:[{prop:"customerName",label:"客户姓名"},{prop:"cardNo",label:"证件号"},{prop:"projectNo",label:"贷款编号"},{prop:"overdueTypeString",label:"名单制类型"},{prop:"riskTypeString",label:"风险类型"},{prop:"carType",label:"汽车类型",formatter:function(e,t,a){return["","新车","二手车"][a]}},{prop:"bankPaymentAmount",label:"放款金额"},{prop:"bankPaymentDate",label:"放款时间"},{prop:"loanAmount",label:"贷款金额"},{prop:"loanTermString",label:"期数"},{prop:"coBankName",label:"合作银行"},{prop:"launchOrgName",label:"发起机构"},{prop:"operatorName",label:"登记人"},{prop:"status",label:"处理状态",formatter:function(e,t,a){return["","处理中","处理完成"][a]}},{label:"操作",operations:[{label:"反馈登记",command:"feedBack",conditions:[{condition:"status",value:1}]},{label:"修改",command:"modify",conditions:[{condition:"updateButton",value:1},{condition:"status",value:1}]},{label:"查看详情",command:"viewDetail"}]}],tableParams:{},orgList:[],coBank:[],listType:[],riskType:[]}},methods:{btnSearch:function(){this.tableParams=s()({},this.searchForm)},resetForm:function(){this.$refs.searchForm.resetFields()},exportExcel:function(){var e="";for(var t in this.searchForm)e+=t+"="+this.searchForm[t]+"&";var a=e.substring(0,e.lastIndexOf("&")),o="/api/riskProfile/export?"+a;window.open(o,"_blank")},riskRegister:function(){Object(m.b)({title:"风险档案登记",href:"./Modal/riskFile/riskRegister/riskRegister.html?type=1"})},operate:function(e){"feedBack"==e.type?this.feedBack(e.item,e.index):"modify"==e.type?this.modify(e.item,e.index):this.viewDetail(e.item,e.index)},feedBack:function(e,t){Object(m.b)({title:"反馈登记",href:"./Modal/riskFile/riskRegister/riskRegister.html?type=4&id="+e.id})},modify:function(e,t){Object(m.b)({title:"风险档案登记修改",href:"./Modal/riskFile/riskRegister/riskRegister.html?type=2&id="+e.id})},viewDetail:function(e,t){Object(m.b)({title:"查看风险档案详情",href:"./Modal/riskFile/riskRegister/riskRegister.html?type=3&id="+e.id})}},mounted:function(){this.tableParams=s()({},this.searchForm),Object(m.k)(this),Object(m.e)(this,"coBank"),Object(m.i)(this,"orgList"),Object(m.d)(this,{riskType:"riskType",overdueType:"listType"})}},f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrap wrapper-content"},[a("div",{staticClass:"ibox float-e-margins"},[a("div",{staticClass:"ibox-content"},[a("el-row",{attrs:{gutter:20}},[a("el-form",{ref:"searchForm",attrs:{model:e.searchForm,"label-width":"80px",size:"small"}},[a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"客户姓名:",placeholder:"请输入客户姓名",prop:"customerName",offset:1},model:{value:e.searchForm.customerName,callback:function(t){e.$set(e.searchForm,"customerName",t)},expression:"searchForm.customerName"}}),e._v(" "),a("cd-input",{attrs:{label:"证件号:",placeholder:"请输入证件号",prop:"cardNo"},model:{value:e.searchForm.cardNo,callback:function(t){e.$set(e.searchForm,"cardNo",t)},expression:"searchForm.cardNo"}}),e._v(" "),a("cd-input",{attrs:{label:"贷款编号:",placeholder:"请输入贷款编号",prop:"projectNo"},model:{value:e.searchForm.projectNo,callback:function(t){e.$set(e.searchForm,"projectNo",t)},expression:"searchForm.projectNo"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"登记人:",placeholder:"请输入登记人",prop:"addUser",offset:1},model:{value:e.searchForm.addUser,callback:function(t){e.$set(e.searchForm,"addUser",t)},expression:"searchForm.addUser"}}),e._v(" "),a("cd-select",{attrs:{label:"发起机构:",options:e.orgList,prop:"launchOrgId"},model:{value:e.searchForm.launchOrgId,callback:function(t){e.$set(e.searchForm,"launchOrgId",t)},expression:"searchForm.launchOrgId"}}),e._v(" "),a("cd-select",{attrs:{label:"合作银行:",options:e.coBank,prop:"coBankId"},model:{value:e.searchForm.coBankId,callback:function(t){e.$set(e.searchForm,"coBankId",t)},expression:"searchForm.coBankId"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-select",{attrs:{label:"名单制类型:",prop:"overdueType",options:e.listType,offset:1},model:{value:e.searchForm.overdueType,callback:function(t){e.$set(e.searchForm,"overdueType",t)},expression:"searchForm.overdueType"}}),e._v(" "),a("cd-select",{attrs:{label:"风险类型:",prop:"riskType",options:e.riskType},model:{value:e.searchForm.riskType,callback:function(t){e.$set(e.searchForm,"riskType",t)},expression:"searchForm.riskType"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-search-button",{on:{search:e.btnSearch,reset:e.resetForm}})],1)],1)],1)],1)]),e._v(" "),a("div",{staticClass:"ibox float-e-margins"},[a("div",{staticClass:"ibox-content"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right","margin-bottom":"15px"},attrs:{span:24}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.exportExcel}},[e._v("导出excel")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.riskRegister}},[e._v("风险档案登记")])],1),e._v(" "),a("cd-table",{attrs:{params:e.tableParams,columns:e.columns,url:"riskProfile/list"},on:{operation:e.operate}})],1)],1)])])},b=[],_={render:f,staticRenderFns:b},g=_,v=a("VU/8"),y=v(h,g,!1,null,null,null),k=y.exports;o.default.use(r.a),o.default.use(l.a),o.default.http.options.emulateJSON=!0,new o.default({el:"#riskFileList",template:"<risk-list></risk-list>",components:{riskList:k}})}},["z+b3"]);
//# sourceMappingURL=riskFileList.366ceba812a648d1b90b.js.map