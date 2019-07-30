//定义组件
(function() {
    return comp = {
        inputCompoent: Vue.extend({
            props: ['label', 'name', 'class', 'id', 'readonly', 'disabled', 'placeholder', 'keyup', 'btnCls', 'btnLabel', 'btnClick', 'm', 'value', "maxlength"],
            data: function data() {
                return {
                    labelCls: 'col-md-3 col-xs-3 col-sm-3',
                    divCls: 'col-md-5 col-xs-5 col-sm-5'
                };
            },
            template: ['<div class="input-tip">', '<label class="control-label {{ labelCls }}">', '<span class="text-danger" v-if="hasReqired()">*</span>&nbsp;{{ label }}:', '</label>',
                '<div class="{{ divCls }}">',
                '<div class="{{ btnCls }}">',
                '<input ', 'type="text" ', 'placeholder="请输入{{ placeholder || label }}" ', ':name="name" ', 'class="form-control {{ class || \'\' }}" ',
                ':id="id" ', ':readonly="readonly" ', ':disabled="disabled" ', 'v-model="m" ', 'value="{{ value }}" ', ':maxlength=maxlength', ' />',
                '<div class="input-group-btn" v-if="btnCls">',
                '<button type="button" class="btn btn-primary btn-sm"> {{ btnLabel }} </button>', '</div>', '</div>', '</div>', '</div>'].join(""),
            methods: {
                hasReqired: function hasReqired() {
                    return this.class.indexOf("required") != -1;
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
            template: ['<div class="input-tip">', '<label class="control-label {{ labelCls }}">', '<span class="text-danger" v-if="hasReqired()">*</span>&nbsp;{{ label }}:', '</label>', '<div class="{{ divCls }}">', '<select :name="name" class="form-control" :class="class" :id="id" :disabled="disabled" v-model="m" :multiple="multiple" @change="change()" />',
                '<option v-if="type == 0" value="">--请选择--</option>',
                '<option v-if="type == 0" v-for="item in options" :value="item.val" v-text="item.name"></option>',
                '<option v-if="type == 1" v-for="item in options" value="{{ $index ? $index : \'\' }}">{{ (item && item != "0") ? item : \'--请选择--\' }}</option>', '</select>', '</div>', '</div>'].join(""),
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
        }),
        tableCompoent: Vue.extend({
            props: ['id', 'class', 'ajax', 'checkbox', 'tableEvent', 'field', 'formatter', 'events', 'options'],
            template: [
                '<table :id="id" :class="class" data-toggle="table" :data-ajax="ajax">',
                '<thead>',
                '<tr>',
                '<th data-checkbox="true" v-if="hasCheckbox()"></th>',
                '<th v-for="item in options" data-field="{{item.field}}" data-formatter="{{item.formatter}}" data-events="{{item.events}}">{{item.name}}</th>',
                '<th :data-formatter="formatter" :data-events="events" v-if="hasFormatter()"></th>'+
                '</tr>',
                '</thead>',
                '</table>'
            ].join(""),
            methods: {
                hasCheckbox: function(value) {
                    if (this.chechbox) {
                        return this.checkbox.indexof('checkbox') != -1;
                    }
                    return false;
                },
                hasFormatter: function() {
                    if (this.formatter) {
                        return true
                    }
                }
            }
        }),
        btnCompoent: Vue.extend({
            props: ['id', 'dismiss', 'class', 'label', 'modal', 'enter', 'reset', 'click'],
            template: [
                        '<button :data-dismiss="dismiss" type="button" class="btn {{class}}" :id="id" :modal="modal">',
                        '<span class="glyphicon glyphicon-search" v-if="enter"></span>',
                        '<span class="glyphicon glyphicon-remove" v-if="reset"></span>',
                        '<span>&nbsp;{{label}}&nbsp;</span></button>'
            ].join("")
        })
    };
})();