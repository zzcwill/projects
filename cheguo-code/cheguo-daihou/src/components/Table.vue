<template>
  <div>
    <el-table
      :data="tableData" :dataLoad="dataLoad" :height="tableHeight" :stripe="stripe" :border="border" :size="size"
      :max-height="maxHeight"  :show-header="showHeader" :empty-text="emptyText"
      @row-click="handleRowClick"  @selection-change="handleSelectionChange"
      :params="params"
      :url="url"
    >
      <el-table-column v-if="checkBox" type="selection" width="55">
      </el-table-column>
      <template v-for="column in columns">
        <!--多个按钮操作试用dropDownMenu-->
        <el-table-column :label="column.label" v-if="column.operations" :align="column.align">
          <template slot-scope="scope">
            <el-dropdown v-if="column.operations.length > 1" trigger="click" @command="handleCommand" :show-timeout="100">
              <el-button type="primary" size="mini">{{column.label}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(operate,index) in column.operations"  v-show="isShow(operate.conditions,scope.row)" :command="{type:operate.command,item:scope.row,index:scope.$index}" :key="operate.label">{{operate.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--操作类型一个直接展示button按钮-->
            <el-button  size="mini" type="primary"  @click="column.operations[0].func(scope.row,scope.$index)" v-show="isShow(column.operations[0].conditions,scope.row)" v-else>{{column.operations[0].label}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          :fixed="column.fixed"
          :width="column.width"
          :sortable="column.sortable"
          :formatter="column.formatter"
          :class-name="column.className"
          :sort-method="column.sortMethod"
          :align="column.align"
          v-else
        ></el-table-column>
      </template>

    </el-table>
    <div style="margin-top: 20px"></div>
    <el-row v-if="isPage && total > tbPageSize">
      <el-col :md="6"></el-col>
      <el-col :md="18" :offset="offset">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :prev-text="prevText"
          :next-text="nextText"
          :current-page="tbCurrentPage"
          :page-size="tbPageSize"
          :page-sizes="[10,25, 50, 100, 500,1000]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>
<script type="text/ecmascript-6">
  import {Fetch} from '../common/js/iframe';
  import MockData from '../common/js/mockData';
  export default{
    name: 'mTable',
    props: {
      tableRef:'',
      params: {},
      url: {},
      dataLoad:{},
//      tableData: {},
      columns: {},
      offset:{default:8},
      tableHeight:{},
      maxHeight:{default:600},
      stripe: {default: true},
      border: {default: true},
      showHeader: {default: true},
      emptyText: {default:'暂无数据'},
      size: {},
      fields: {},
      formatter: {default: false},
      checkBox: {default: false},
      isPage: {default: true,type: Boolean},
      prevText: {default:'上一页'},
      nextText: {default:'下一页'},
//      currentPage: {default: 1},
//      pageSize: {default:10},
//      total: {},
      rowClick:{},
    },
    data(){
      return {
        tbCurrentPage: 1,
        tbPageSize: 10,
        tableData: [],
        total: 0
      }
    },
    components: {

    },
    methods: {
      handleSizeChange(pageSize){
        this.pageData(this.tbCurrentPage,pageSize);
      },
      handleCurrentChange(currentPage){
        this.pageData(currentPage,this.tbPageSize);
      },
      handleCommand(command){
        this.$emit('operation',command)
      },
      handleSelectionChange(selections){
        this.$emit("selectionChange",selections);
      },
      handleRowClick(row,event,columns){
        this.$emit('rowClick',row,event,columns)
      },
      pageData(page=1,pageSize=10){
        let _this = this;
        if(this.url){
          this._data.tbPageSize = pageSize;
          this._data.tbCurrentPage = page;
          let params = Object.assign({},this.params,{page: page,pageSize: pageSize});
          Fetch(this,this.url,params).then(function (res) {
            _this._data.tableData = res.data;
            _this._data.total = res.totalItem;
          }).catch(function () {})
        }else{
          this._data.tableData = this.dataLoad;
          this._data.total = this.dataLoad.length;
        }

      },
      isShow(conditions,row){
        if(conditions){
          return conditions.every(function (item) {
            let judge = '==';
            if(item.judge && item.judge != '='){
              judge = item.judge;
            }
            return eval(row[item.condition] + judge + item.value)
          });
        }else{
          return true;
        }
      }
    },
    watch: {
      params: function (params) {
        this.pageData(1,this.tbPageSize);
      },
      url: function (url) {
        this.pageData(this.tbCurrentPage,this.tbPageSize);
      },
      dataLoad: function (data) {
        if(this.url){
          return
        }else{
          this.pageData();
        }
      }
    },
    mounted(){

    }
  }
</script>
