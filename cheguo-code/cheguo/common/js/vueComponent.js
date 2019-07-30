//自定义组件
(function(){
    return vueComponent={
        inputComponent:Vue.extend({
            props:['label','class','name','disabled','readonly','placeholder','value','m','id'],
            template:'<div class="input-tip">' +
            '<label class="col-md-3 col-sm-3 col-xs-3 control-label"><span class="text-danger" v-if="hasRequired()">*&nbsp;</span>{{label}}：</label>'+
            '<div class="col-md-5 col-sm-5 col-xs-5">' +
            '<div class="input-group" v-if="hasGroup()">' +
            '<input type="text" class="form-control" :placeholder="placeholder || `请输入`+ label" :class="class" :id="id" :name="name" :readonly="readonly" :disabled="disabled" :value="value">'+
            //'<span class="input-group-btn">' +
            //'<slot></slot>' +
            //'</span>' +
            '<slot></slot>'+
            '</div>'+
            '<input v-model="m" type="text" class="form-control" :class="class" :id="id" :name="name" :readonly="readonly" :disabled="disabled" :value="value" :placeholder="placeholder || `请输入`+ label" v-else>'+
            '</div>'+
            '</div>',
            methods:{
                hasRequired:function(){
                    return this.class.indexOf('required') !=-1
                },
                hasGroup: function(){
                    return this.class.indexOf('group') != -1
                }
            }
        }),
        selectComp:Vue.extend({
            props: {
                label:{},
                name:{},
                class:{},
                id:{},
                options:{},
                disabled:{},
                selected:{},
                labelClass: {default:'col-md-3 col-xs-3 col-sm-3'},
                selectClass: {default:'col-md-5 col-xs-5 col-sm-5'}
            },
            //props:['label','name','class','id','options','disabled','selected','labelClass','selectClass'],
            template:'<div class="input-tip">' +
            '<label class="control-label" :class="labelClass"><span class="text-danger" v-if="hasRequired()">*&nbsp;</span>{{label}}：</label>'+
            '<div :class="selectClass">' +
            '<select class="form-control" :class="class" :id="id" :name="name" :disabled="disabled" v-model="selected">' +
            '<option value="" :selected="hasSelected()">--请选择--</option>'+
            '<option v-for="item in options" value="{{item.value}}">{{item.name}}</option>' +
            '</select>'+
            '</div>'+
            '</div>',
            methods:{
                hasRequired:function(){
                    if(this.class){
                        return this.class.indexOf('required') != -1;
                    }
                    return false;
                },
                hasSelected: function(){
                    if(this.selected){
                        return false;
                    }
                    return 'selected'
                }
            }
        }),
        textArea: Vue.extend({
           props: ['label','name','class','id','disabled','readonly','cols','rows'],
           template: '<div class="input-tip">' +
           '<label class="col-md-3 col-sm-3 col-xs-3 control-label">{{label}}：</label>' +
           '<div class="col-md-21">' +
               '<textarea :name="name" class="form-control" :class="class" :id="id" :cols="cols" :rows="rows"></textarea>'+
           '</div>' +
           '</div>'
        }),
        feeselectComp:Vue.extend({
            props:['label','name','class','id','options','disabled','selected'],
            template:'<div class="input-tip">' +
            '<label class="col-md-3 control-label"><span class="text-danger" v-if="hasRequired()">*&nbsp;</span>{{label}}:</label>'+
            '<div class="col-md-5">' +
            '<select class="form-control" :class="class" :id="id" :name="name" :disabled="disabled" v-model="selected">' +
            '<option value="" :selected="hasSelected()">--请选择--</option>'+
            '<option v-for="item in options" value="{{item.value}}" :disabled="item.statue==2" v-show="!item.statue || item.statue!=2">{{item.name}}</option>' +
            '</select>'+
            '</div>'+
            '</div>',
            methods:{
                hasRequired:function(){
                    if(this.class){
                        return this.class.indexOf('required') != -1;
                    }
                    return false;
                },
                hasSelected: function(){
                    if(this.selected){
                        return false;
                    }
                    return 'selected'
                }
            }
        }),
        radioComp:Vue.extend({
            template: '<div class="input-tip">' +
            '<label class="col-md-3 col-sm-3 col-xs-3 control-label"><span class="text-danger" v-if="hasRequired()">*&nbsp;</span>{{label}}：</label>' +
            '<div class="col-md-5 col-sm-5 col-xs-5">' +
            '<label class="radio-inline" v-for="item in options">' +
                '<input type="radio" value="{{item.value}}" :name="name" :readonly="readonly" v-on:click="getvalue" :checked="item.checked">{{item.text}}'+
            '</label>'+
            '</div>' +
            '</div>',
            props:['options','label','readonly','class','name'],
            methods: {
                hasRequired:function(){
                    if(this.class){
                        return this.class.indexOf('required') != -1;
                    }
                    return false;
                },
                getvalue: function(e){
                    var value=$(e.currentTarget).val();
                    this.$emit('radiovalue',value);
                }
            }
        }),
        tableComp:Vue.extend({
            props:['class','id','field','options','ajax','checkbox','formatter','events','checkboxFormatter'],
            template:'<table :id="id" :class="class" data-toggle="table" :data-ajax="ajax">' +
            '<thead>' +
            '<tr>' +
            '<th data-checkbox="true" v-if="hasCheckbox()" :data-formatter="checkboxFormatter"></th>'+
            '<th  v-for="item in options" data-checkbox="{{item.checkBox}}"  data-field="{{item.field}}" data-formatter="{{item.formater}}" data-events="{{item.events}}">{{item.text}}</th>' +
            '<th :data-formatter="formatter" :data-events="events" v-if="hasFormatter()"></th>'+
            '</tr>' +
            '</thead>' +
            '<tbody></tbody>'+
            '</table>',
            methods:{
                hasCheckbox:function(value){
                    if(this.checkbox){
                        return this.checkbox.indexOf('checkbox') != -1;
                    }
                    return false;
                },
                hasFormatter:function(){
                    if(this.formatter){
                        return true;
                    }
                }
            }
        }),
        //区域定价管理展业地区
        areaChoose: Vue.extend({
            props:['label','provinceName','cityName','provinceClass','cityClass','provinceId','cityId','provinceOptions','cityOptions','disabled'],
            template:'<div class="input-tip">' +
            '<label class="col-md-2 control-label"><span class="text-danger" v-if="hasRequired()">*&nbsp;</span>{{label}}</label>'+
            '<div class="col-md-3">' +
                '<select class="form-control" :class="provinceClass" :id="provinceId" :name="provinceName" :disabled="disabled" v-on:change="provincechange">' +
                    '<option value="">省</option>'+
                    '<option v-for="item in provinceOptions" value="{{item.value}}">{{item.name}}</option>' +
                '</select>'+
            '</div>'+
            '<div class="col-md-3">'+
                '<select class="form-control show-tick" :class="cityClass" :id="cityId" :name="cityName" :disabled="disabled" title="市" multiple data-live-search="false" data-style="btn-default btn-sm">' +
                    //'<option value="">市</option>'+
                    '<option v-for="item in cityOptions" value="{{item.areacode}}">{{item.city}}</option>' +
                '</select>'+
                //'<select class="form-control" :class="cityClass" :id="cityId" :name="cityName" :disabled="disabled" v-if="hasMultiple()">' +
                //    '<option value="">--市--</option>'+
                //    '<option v-for="item in cityOptions" value="{{item.areacode}}">{{item.city}}</option>' +
                //'</select>'+
            '</div>'+

            '</div>',
            methods:{
                hasRequired:function(){
                    if(this.cityClass){
                        return this.cityClass.indexOf('required') != -1;
                    }
                    return false;
                },
                hasMultiple: function(){
                    if(this.cityClass){
                        return this.cityClass.indexOf('selectpicker') != -1;
                    }
                    return true;
                },
                provincechange: function(e){
                    var value=$(e.currentTarget).val();
                    var text=$(e.currentTarget).find("option:selected").html();
                    this.$emit('provincechange',value,text);
                }
            }
        }),
        //区域定价方案 起止时间
        planDate: Vue.extend({
            props:['label','startDisabled','endDisabled','class','startValue','endValue','startName','endName','start','end'],
            template: '<div class="input-tip">' +
                '<label class="col-md-3 col-sm-3 col-xs-3 control-label"><span class="text-danger" v-if="hasRequired()">&nbsp;*</span>{{label}}</label>' +
                '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<input type="text" class="form-control date" v-model="start" :name="startName" :class="class" :disabled="startDisabled" placeholder="--请选择--" :value="startValue"/>' +
                '</div>' +
            '</div>'+
            '<div class="input-tip">' +
                '<label class="col-md-1 col-sm-1 col-xs-1" style="height: 1px;margin-top: 15px;background-color: #999;"></label>'+
                '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<input type="text" class="form-control date" v-model="end" :name="endName" :class="class" :disabled="endDisabled" placeholder="--请选择--" :value="endValue"/>' +
                '</div>' +
            '</div>',
            methods: {
                hasRequired:function(){
                    if(this.class){
                        return this.class.indexOf('required') != -1;
                    }
                    return false;
                }
            }
        }),
        //模态弹出框
        modalFade: Vue.extend({
            props:['title','id','class'],
            template: '<div class="modal fade" :id="id">'+
            '<div class="modal-dialog" :class="class">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                    '<h4 class="modal-title">{{title}}</h4>'+
                '</div>'+
                '<div class="modal-body">'+
                    '<div class="row">'+
                        '<slot name="body"></slot>'+
                    '</div>'+
                '</div>'+
                '<div class="modal-footer">'+
                    '<slot name="foot"></slot>'+
                    //'<button type="button" class="btn btn-primary" id="select-pay-btn" data-dismiss="modal">确定</button>'+
                    //'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>'
        }),
        //流程意见
        flowOpinion: Vue.extend({
            props:['id'],
            template:'<div class="row">'+
        '<div class="col-sm-24">'+
        '<div class="ibox float-e-margins">'+
        '<form :id="id" class="form-horizontal ibox-content">'+
            '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                    '<h3 class="panel-title">流程意见</h3>'+
                '</div>'+
                '<div class="panel-body">'+
                    '<div class="form-group form-group-sm">'+
                        '<slot name="conclusion"></slot>'+
                    '</div>'+
                    '<div class="form-group form-group-sm">'+
                        '<div class="input-tip">'+
                            '<label class="col-xs-3 col-sm-3 col-md-3 control-label">意见说明：</label>'+
                            '<div class="col-xs-13 col-sm-13 col-md-13">'+
                                '<textarea class="form-control" rows="3" name="opinion" id="opinionText"></textarea>'+
                            '</div>'+
                            '<div class="col-xs-8 col-sm-8 col-md-8 text-right" style="padding-top: 33px;">'+
                                '<button type="button" class="btn btn-primary"  v-on:click="saveBtn"><span>保存</span>'+
                                '</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="form-group form-group-sm">'+
                '<div class="col-md-24 text-right">'+
                    '<slot name="foot"></slot>'+
                '</div>'+
            '</div>'+
        '</form>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>',
            methods: {
                saveBtn: function(){
                    this.$emit('btnsave')
                }
            }
        }),
	    inputComponent2:Vue.extend({
		    props: {
			    label:{},
			    name:{},
			    class:{},
			    id:{},
			    placeholder: {},
			    disabled:{default:false},
			    value: {},
			    m: {},
			    readonly: {},
			    labelClass: {default:'col-md-1 col-xs-1 col-sm-1'},
			    inputClass: {default:'col-md-3 col-xs-3 col-sm-3'}
		    },
		    //props:['label','class','name','disabled','readonly','placeholder','value','m','id'],
		    template:'<div class="input-tip">' +
		    '<label class="control-label" :class="labelClass"><span class="text-danger" v-if="hasRequired()">*&nbsp;</span>{{label}}</label>'+
		    '<div :class="inputClass">' +
		    '<div class="input-group" v-if="hasGroup()">' +
		    '<input type="text" class="form-control" :placeholder="placeholder" :class="class" :id="id" :name="name"' +
		    ' :readonly="readonly" :disabled="disabled" :value="value" :data-date-format="data-date-format">'+
		    //'<span class="input-group-btn">' +
		    //'<slot></slot>' +
		    //'</span>' +
		    '<slot></slot>'+
		    '</div>'+
		    '<input v-model="m" type="text" class="form-control" :class="class"' +
		    ' :id="id" :name="name"' +
		    ' :readonly="readonly" :disabled="disabled" :value="value" :placeholder="placeholder" v-else>'+
		    '</div>'+
		    '</div>',
		    methods:{
			    hasRequired:function(){
				    return this.class.indexOf('required') !=-1
			    },
			    hasGroup: function(){
				    return this.class.indexOf('group') != -1
			    }
		    }
	    }),
    }
})();
