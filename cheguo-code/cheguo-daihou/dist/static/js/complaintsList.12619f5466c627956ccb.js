webpackJsonp([5],{0:function(e,t){},"1nsR":function(e,t){},ABj6:function(e,t,a){"use strict";var o=a("sYoA"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{attrs:{data:e.tableData,dataLoad:e.dataLoad,height:e.tableHeight,stripe:e.stripe,border:e.border,size:e.size,"max-height":e.maxHeight,"show-header":e.showHeader,"empty-text":e.emptyText,params:e.params,url:e.url},on:{"row-click":e.handleRowClick,"selection-change":e.handleSelectionChange}},[e.checkBox?a("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),e._v(" "),e._l(e.columns,function(t){return[t.operations?a("el-table-column",{attrs:{label:t.label,align:t.align},scopedSlots:e._u([{key:"default",fn:function(o){return[t.operations.length>1?a("el-dropdown",{attrs:{trigger:"click","show-timeout":100},on:{command:e.handleCommand}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v(e._s(t.label)),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(t.operations,function(t,n){return a("el-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:e.isShow(t.conditions,o.row),expression:"isShow(operate.conditions,scope.row)"}],key:t.label,attrs:{command:{type:t.command,item:o.row,index:o.$index}}},[e._v(e._s(t.label))])}))],1):a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isShow(t.operations[0].conditions,o.row),expression:"isShow(column.operations[0].conditions,scope.row)"}],attrs:{size:"mini",type:"primary"},on:{click:function(e){t.operations[0].func(o.row,o.$index)}}},[e._v(e._s(t.operations[0].label))])]}}])}):a("el-table-column",{key:t.prop,attrs:{label:t.label,prop:t.prop,fixed:t.fixed,width:t.width,sortable:t.sortable,formatter:t.formatter,"class-name":t.className,"sort-method":t.sortMethod,align:t.align}})]})],2),e._v(" "),a("div",{staticStyle:{"margin-top":"20px"}}),e._v(" "),e.isPage&&e.total>e.tbPageSize?a("el-row",[a("el-col",{attrs:{md:6}}),e._v(" "),a("el-col",{attrs:{md:18,offset:e.offset}},[a("el-pagination",{attrs:{"prev-text":e.prevText,"next-text":e.nextText,"current-page":e.tbCurrentPage,"page-size":e.tbPageSize,"page-sizes":[10,25,50,100,500,1e3],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)},l=[],r={render:n,staticRenderFns:l},i=r,s=a("VU/8"),c=s(o.a,i,!1,null,null,null);t.a=c.exports},MZCK:function(e,t,a){"use strict";function o(e,t){if("object"!==(void 0===t?"undefined":y()(t)))return n(e,{message:"参数异常"});var a=_()(t);s(e,"cooperation/codeLibrary/list",{codeTypes:a}).then(function(o){a.forEach(function(a){var n=t[a],l="",r=o.data[a].map(function(e){return l=isNaN(e.codeId)?e.codeId:Number(e.codeId),{label:e.codeName,value:l}});r.unshift({label:"全部",value:""}),e[n]=r})})}function n(e,t){e.$message({type:t.type||"success",center:t.center||!0,duration:t.duration||2e3,message:t.message||"操作成功",customClass:t.customClass||"messageTip"})}function l(e){if(e.href)return window.parent.menuItemClick.call(e)}function r(){window.parent.closeTab()}function i(){var e,t,a,o,n,l,r;for(l=location.search.length>0?location.search.substring(1):"",o=l.length?l.split("&"):[],e={},t=0;t<o.length;)a=o[t].split("="),n=decodeURIComponent(a[0]),r=decodeURIComponent(a[1]),n.length&&(e[n]=r),t++;return e}function s(e,t,a){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"post";return new b.a(function(l,r){e.$http[o]("/api/"+t,a).then(function(a){var o=a.data;if(2e4===o.code)n(e,{type:"error",message:o.message||t+" 接口异常！！！"}),r();else{if(3e4===o.code)return window.parent.location.href="../../../index.html";"string"==typeof o&&(o=JSON.parse(a.data)),l(o)}})})}function c(e){e.$http.get("/api/getSystemName").then(function(e){var t=e.data,a="gray-bg";"string"==typeof e.data&&(t=JSON.parse(e.data)),1e4===t.code&&(a="shengan"===t.data.systemName?"gray-bg styleCR":"cherong"===t.data.systemName?"gray-bg styleCRW":"gray-bg",document.getElementsByClassName("gray-bg")[0].className=a)}).catch(function(e){console.log("404 Not Found")})}function p(e,t){s(e,"org/list").then(function(a){var o=a.data.module,n=o.map(function(e,t){return{label:e.name,value:e.id}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(t){e.$message({message:"接口 org/list 未找到",type:"error",center:"true",duration:2e3})})}function m(e,t){s(e,"cooperation/bank/all").then(function(a){var o=a.data,n=o.map(function(e,t){return{label:e.bankName,value:e.id}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(t){e.$message({message:"接口 cooperation/bank/all 未找到",type:"error",center:"true",duration:2e3})})}function u(e,t){s(e,"complaint/configList").then(function(a){var o=a.data,n=o.map(function(e,t){return{label:e.reason,value:e.id}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(t){n(e,{type:"error",message:"接口 complaint/configList 未找到"})})}function d(e,t,a){if(t)return s(e,"complaint/configList").then(function(o){var n=o.data,l=n.filter(function(e,a){return e.id==t});e[a]=l[0].complaintType}).catch(function(){n(e,{type:"error",message:"接口 complaint/configList 未找到"})})}function h(e,t){s(e,"gps/getSupplierList").then(function(a){var o=a.data,n=o.map(function(e){return{label:e.supplierName,value:e.supplierId}});n.unshift({label:"全部",value:""}),e[t]=n}).catch(function(){})}t.d=o,t.l=n,t.b=l,t.c=r,t.f=i,t.a=s,t.k=c,t.i=p,t.e=m,t.g=u,t.h=d,t.j=h;var f=a("//Fk"),b=a.n(f),g=a("fZjL"),_=a.n(g),v=a("pFYg"),y=a.n(v)},dS7c:function(e,t,a){"use strict";a("zNUS")},gVu1:function(e,t){},pa0c:function(e,t,a){"use strict";var o={name:"",props:{prop:{},required:{},colspan:{default:7},colMd:{default:7},colXs:{default:7},colSm:{default:7},colLg:{default:7},offset:{},label:{},placeholder:{},maxlength:{},minlength:{},size:{},prefixIcon:{},suffixIcon:{},rows:{},type:{},disabled:{default:!1,type:Boolean},readonly:{default:!1,type:Boolean},inputClass:{},inputId:{},inputRef:{},value:{},prependSlot:{},appendSlot:{},labelWidth:{}},data:function(){return{}},methods:{handleChange:function(e){this.$emit("inputChange",e)},handleBlur:function(e){this.$emit("inputBlur",e)},handleFocus:function(e){this.$emit("inputFocus",e)}}},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-col",{attrs:{span:e.colspan,md:e.colMd,xs:e.colXs,lg:e.colLg,offset:e.offset}},[a("el-form-item",{attrs:{label:e.label,prop:e.prop,required:e.required,"label-width":e.labelWidth}},[a("el-input",{ref:e.inputRef,class:e.inputClass,attrs:{value:e.value,type:e.type,disabled:e.disabled,readonly:e.readonly,placeholder:e.placeholder,maxlength:e.maxlength,minlength:e.minlength,size:e.size,"prefix-icon":e.prefixIcon,"suffix-icon":e.suffixIcon,rows:e.rows,id:e.inputId},on:{input:function(t){e.$emit("input",t)},change:e.handleChange,blur:e.handleBlur,focus:e.handleFocus}},[e.prependSlot?a("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._t("prependSlot")],2):e._e(),e._v(" "),e.appendSlot?a("div",{attrs:{slot:"append"},slot:"append"},[e._t("appendSlot")],2):e._e()])],1)],1)],1)},l=[],r={render:n,staticRenderFns:l},i=r,s=a("VU/8"),c=s(o,i,!1,null,null,null);t.a=c.exports},"sO/i":function(e,t,a){"use strict";function o(e){a("1nsR")}Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),l=a("zL8q"),r=a.n(l),i=a("8+8L"),s=(a("tvR6"),a("gVu1"),a("woOf")),c=a.n(s),p=(a("dS7c"),a("pa0c")),m=a("ABj6"),u=a("wi0O"),d=a("MZCK"),h={name:"complaintsList",components:{"cd-input":p.a,"cd-table":m.a,"cd-select":u.a},data:function(){return{tableParams:{},complaintTypeParams:{},columns:[{prop:"customerName",label:"客户姓名"},{prop:"cardNo",label:"证件号"},{prop:"projectNo",label:"贷款编号"},{prop:"complaintTypeName",label:"投诉类别"},{prop:"operatorName",label:"登记人"},{prop:"createTime",label:"登记时间"},{prop:"coBankName",label:"贷款机构"},{prop:"launchOrgName",label:"发起分公司"},{prop:"overFinishTime",label:"处理回复截止时间"},{prop:"statusString",label:"投诉状态"},{prop:"complaintGrade",label:"投诉升级",formatter:function(e,t,a){return["否","是"][a]||"--"}},{prop:"nodeName",label:"当前流程环节"},{prop:"nodeOperatorName",label:"当前处理人"},{label:"操作",operations:[{label:"修改",command:"modify",conditions:[{condition:"canUpdate",value:1},{condition:"status",value:1}]},{label:"查看",command:"viewDetail"}]}],currentPage:1,pageSize:10,orgList:[],coBank:[],complaintStatus:[{label:"全部",value:""},{label:"未指派",value:1},{label:"处理中",value:2},{label:"已处理未确认",value:3},{label:"超时",value:4},{label:"超时完成",value:5},{label:"已处理已确认",value:6}],complaintGrades:[{label:"全部",value:""},{label:"是",value:1},{label:"否",value:0}],reasonType:[{label:"全部",value:""},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"}],complaintType:[],searchForm:{customerName:"",complaintType:"",complaintGrade:"",projectNo:"",addUserName:"",launchOrgId:"",coBankId:"",status:"",entryTimeStart:"",entryTimeEnd:""},reasonForm:{complaintType:"",reason:"",handlingHour:""},dialogFormVisible:!1,reasonList:[],reasonColumns:[{prop:"complaintType",label:"投诉分类",align:"center"},{prop:"reason",label:"投诉原因",align:"center"},{prop:"handlingHour",label:"处理时间(小时)",align:"center"},{label:"操作",align:"center",operations:[{label:"删除",func:this.reasonCancel}]}],reasonRule:{complaintType:[{required:!0,message:"请选择投诉分类"}],reason:[{required:!0,message:"请填写投诉原因"}],handlingHour:[{required:!0,message:"请填写处理时间"},{type:"number",message:"处理时间必须是数字"}]}}},methods:{search:function(){var e=c()({},this.searchForm);this.tableParams=e},resetForm:function(){this.$refs.searchForm.resetFields()},reasonDeploy:function(){this.complaintTypeParams={},this.dialogFormVisible=!0},downExport:function(){var e="";for(var t in this.searchForm)e+=t+"="+this.searchForm[t]+"&";var a=e.substring(0,e.lastIndexOf("&")),o="/api/complaint/complaintInfoExport?"+a;console.log(o),window.open(o,"_blank")},register:function(){Object(d.b)({title:"投诉登记",href:"./Modal/complaints/complainRegister/complainRegister.html?type=1&status=add&tableName=complaint_info"})},operate:function(e){"modify"===e.type?this.modify(e.item,e.index):"viewDetail"===e.type&&this.viewDetail(e.item,e.index)},modify:function(e,t){Object(d.b)({title:"投诉登记修改",href:"./Modal/complaints/complainRegister/complainRegister.html?type=2&id="+e.id+"&status=modify&tableName=complaint_info&typeOption=submit&currentNode="+e.nodeKey+"&nodeName="+e.nodeName+"&nodeOperatorName="+e.nodeOperatorName})},viewDetail:function(e,t){Object(d.b)({title:"查看详情",href:"./Modal/complaints/complainRegister/complainRegisterSee.html?type=3&id="+e.id+"&status=show&tableName=complaint_info"})},addReason:function(){var e=this;this.$refs.reasonForm.validate().then(function(t){Object(d.a)(e,"complaint/addConfig",c()({},e.reasonForm)).then(function(t){Object(d.l)(e,{message:t.data}),e.$refs.reasonForm.resetFields(),e.complaintTypeParams={}})}).catch(function(){console.log("fail")})},reasonCancel:function(e,t){var a=this;e.id&&Object(d.a)(this,"complaint/delConfig",{id:e.id}).then(function(e){Object(d.l)(a,{message:e.data}),a.complaintTypeParams={}}).catch(function(){})},dialogClose:function(){Object(d.g)(this,"complaintType")}},mounted:function(){Object(d.k)(this),Object(d.g)(this,"complaintType"),Object(d.i)(this,"orgList"),Object(d.e)(this,"coBank");var e=c()({},this.searchForm);this.tableParams=e}},f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox"},[a("div",{staticClass:"ibox-content"},[a("el-row",{attrs:{gutter:20}},[a("el-form",{ref:"searchForm",attrs:{model:e.searchForm,"label-width":"135px",size:"small"}},[a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"客户姓名:",placeholder:"请输入客户姓名",prop:"customerName"},model:{value:e.searchForm.customerName,callback:function(t){e.$set(e.searchForm,"customerName",t)},expression:"searchForm.customerName"}}),e._v(" "),a("cd-select",{attrs:{label:"投诉类别:",options:e.complaintType,prop:"complaintType"},model:{value:e.searchForm.complaintType,callback:function(t){e.$set(e.searchForm,"complaintType",t)},expression:"searchForm.complaintType"}}),e._v(" "),a("cd-input",{attrs:{label:"贷款编号:",placeholder:"请输入贷款编号",prop:"projectNo"},model:{value:e.searchForm.projectNo,callback:function(t){e.$set(e.searchForm,"projectNo",t)},expression:"searchForm.projectNo"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-input",{attrs:{label:"登记人:",placeholder:"请输入登记人",prop:"addUserName"},model:{value:e.searchForm.addUserName,callback:function(t){e.$set(e.searchForm,"addUserName",t)},expression:"searchForm.addUserName"}}),e._v(" "),a("cd-select",{attrs:{label:"发起分公司:",options:e.orgList,prop:"launchOrgId"},model:{value:e.searchForm.launchOrgId,callback:function(t){e.$set(e.searchForm,"launchOrgId",t)},expression:"searchForm.launchOrgId"}}),e._v(" "),a("cd-select",{attrs:{label:"贷款机构:",options:e.coBank,prop:"coBankId"},model:{value:e.searchForm.coBankId,callback:function(t){e.$set(e.searchForm,"coBankId",t)},expression:"searchForm.coBankId"}})],1),e._v(" "),a("el-col",{attrs:{sapn:24}},[a("cd-select",{attrs:{label:"投诉状态:",options:e.complaintStatus,prop:"status"},model:{value:e.searchForm.status,callback:function(t){e.$set(e.searchForm,"status",t)},expression:"searchForm.status"}}),e._v(" "),a("cd-select",{attrs:{label:"投诉升级:",options:e.complaintGrades,prop:"complaintGrade"},model:{value:e.searchForm.complaintGrade,callback:function(t){e.$set(e.searchForm,"complaintGrade",t)},expression:"searchForm.complaintGrade"}})],1),e._v(" "),a("el-col",{attrs:{sapn:24}},[a("cd-input",{staticClass:"hide",attrs:{prop:"entryTimeStart"},model:{value:e.searchForm.entryTimeStart,callback:function(t){e.$set(e.searchForm,"entryTimeStart",t)},expression:"searchForm.entryTimeStart"}}),e._v(" "),a("cd-input",{staticClass:"hide",attrs:{prop:"entryTimeEnd"},model:{value:e.searchForm.entryTimeEnd,callback:function(t){e.$set(e.searchForm,"entryTimeEnd",t)},expression:"searchForm.entryTimeEnd"}}),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"投诉登记时间:"}},[a("el-date-picker",{attrs:{placeholder:"请选择截止时间",type:"date","value-format":"yyyy-MM-dd",prop:"entryTimeStart"},model:{value:e.searchForm.entryTimeStart,callback:function(t){e.$set(e.searchForm,"entryTimeStart",t)},expression:"searchForm.entryTimeStart"}})],1)],1),e._v(" "),a("el-col",{attrs:{md:7,xs:7,sm:7,lg:7}},[a("el-form-item",{attrs:{label:"至:"}},[a("el-date-picker",{attrs:{placeholder:"请选择截止时间",type:"date","value-format":"yyyy-MM-dd",prop:"entryTimeEnd"},model:{value:e.searchForm.entryTimeEnd,callback:function(t){e.$set(e.searchForm,"entryTimeEnd",t)},expression:"searchForm.entryTimeEnd"}})],1)],1)],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"center"},attrs:{md:24,sm:24,xs:24}},[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-error"},on:{click:e.resetForm}},[e._v("清除查询条件")])],1)],1)],1)],1)]),e._v(" "),a("div",{staticClass:"ibox"},[a("div",{staticClass:"ibox-content"},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{sapn:24}},[a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",size:"small"},on:{click:e.downExport}},[e._v("导出数据")]),e._v(" "),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",size:"small"},on:{click:e.reasonDeploy}},[e._v("投诉原因配置")]),e._v(" "),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",size:"small"},on:{click:e.register}},[e._v("投诉登记")])],1),e._v(" "),a("cd-table",{attrs:{columns:e.columns,url:"complaint/complaintInfoList",params:e.tableParams},on:{operation:e.operate}})],1)]),e._v(" "),a("el-dialog",{attrs:{title:"投诉原因配置",visible:e.dialogFormVisible,width:"80%"},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.dialogClose}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-form",{ref:"reasonForm",attrs:{model:e.reasonForm,"label-width":"120px",size:"small",rules:e.reasonRule}},[a("el-col",{attrs:{span:24}},[a("cd-select",{attrs:{label:"投诉分类:",prop:"complaintType",options:e.reasonType},model:{value:e.reasonForm.complaintType,callback:function(t){e.$set(e.reasonForm,"complaintType",t)},expression:"reasonForm.complaintType"}}),e._v(" "),a("cd-input",{attrs:{label:"投诉原因:","col-md":8,placeholder:"请输入投诉原因",prop:"reason"},model:{value:e.reasonForm.reason,callback:function(t){e.$set(e.reasonForm,"reason",t)},expression:"reasonForm.reason"}}),e._v(" "),a("cd-input",{attrs:{label:"处理时间(小时):","col-md":8,placeholder:"请输入处理时间",prop:"handlingHour"},model:{value:e.reasonForm.handlingHour,callback:function(t){e.$set(e.reasonForm,"handlingHour",e._n(t))},expression:"reasonForm.handlingHour"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addReason}},[e._v("新增投诉原因")])],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("cd-table",{attrs:{columns:e.reasonColumns,url:"complaint/configList",params:e.complaintTypeParams}})],1)],1),e._v(" "),a("el-button",{attrs:{type:"default",size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")])],1)])],1)},b=[],g={render:f,staticRenderFns:b},_=g,v=a("VU/8"),y=o,w=v(h,_,!1,y,"data-v-06e91a3d",null),x=w.exports;n.default.use(r.a),n.default.use(i.a),n.default.http.options.emulateJSON=!0,new n.default({el:"#complaintsList",template:"<complaints-list></complaints-list>",components:{complaintsList:x}})},sYoA:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__=__webpack_require__("woOf"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__),__WEBPACK_IMPORTED_MODULE_1__common_js_iframe__=__webpack_require__("MZCK"),__WEBPACK_IMPORTED_MODULE_2__common_js_mockData__=__webpack_require__("dS7c");__webpack_exports__.a={name:"mTable",props:{tableRef:"",params:{},url:{},dataLoad:{},columns:{},offset:{default:8},tableHeight:{},maxHeight:{default:600},stripe:{default:!0},border:{default:!0},showHeader:{default:!0},emptyText:{default:"暂无数据"},size:{},fields:{},formatter:{default:!1},checkBox:{default:!1},isPage:{default:!0,type:Boolean},prevText:{default:"上一页"},nextText:{default:"下一页"},rowClick:{}},data:function(){return{tbCurrentPage:1,tbPageSize:10,tableData:[],total:0}},components:{},methods:{handleSizeChange:function(e){this.pageData(this.tbCurrentPage,e)},handleCurrentChange:function(e){this.pageData(e,this.tbPageSize)},handleCommand:function(e){this.$emit("operation",e)},handleSelectionChange:function(e){this.$emit("selectionChange",e)},handleRowClick:function(e,t,a){this.$emit("rowClick",e,t,a)},pageData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,a=this;if(this.url){this._data.tbPageSize=t,this._data.tbCurrentPage=e;var o=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({},this.params,{page:e,pageSize:t});Object(__WEBPACK_IMPORTED_MODULE_1__common_js_iframe__.a)(this,this.url,o).then(function(e){a._data.tableData=e.data,a._data.total=e.totalItem}).catch(function(){})}else this._data.tableData=this.dataLoad,this._data.total=this.dataLoad.length},isShow:function isShow(conditions,row){return!conditions||conditions.every(function(item){var judge="==";return item.judge&&"="!=item.judge&&(judge=item.judge),eval(row[item.condition]+judge+item.value)})}},watch:{params:function(e){this.pageData(1,this.tbPageSize)},url:function(e){this.pageData(this.tbCurrentPage,this.tbPageSize)},dataLoad:function(e){this.url||this.pageData()}},mounted:function(){}}},tvR6:function(e,t){},tvkE:function(e,t){},wi0O:function(e,t,a){"use strict";function o(e){a("tvkE")}var n={name:"",props:{prop:{},options:{type:Array},label:{},labelWidth:{},value:"",colSpan:{},colLg:{default:7,type:Number},colMd:{default:7,type:Number},colSm:{default:7,type:Number},colXs:{default:7,type:Number},offset:{},multiple:{default:!1},disabled:{default:!1},size:{},placeholder:{default:"请选择"}},data:function(){return{}},components:{},methods:{change:function(e){this.$emit("input",e)},handleChange:function(e){this.$emit("selectChange",e)},handleRemove:function(e){this.$emit("removeTag",e)}},mounted:function(){}},l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"cd_select"}},[a("el-col",{attrs:{span:e.colSpan,md:e.colMd,xs:e.colXs,sm:e.colSm,lg:e.colLg,offset:e.offset}},[a("el-form-item",{attrs:{label:e.label,prop:e.prop,"label-width":e.labelWidth}},[a("el-select",{attrs:{value:e.value,multiple:e.multiple,disabled:e.disabled,size:e.size,placeholder:e.placeholder,filterable:""},on:{input:function(t){e.change(t)},change:e.handleChange,"remove-tag":e.handleRemove}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1)},r=[],i={render:l,staticRenderFns:r},s=i,c=a("VU/8"),p=o,m=c(n,s,!1,p,null,null);t.a=m.exports}},["sO/i"]);
//# sourceMappingURL=complaintsList.12619f5466c627956ccb.js.map