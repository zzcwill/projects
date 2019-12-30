<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item label="产品名称:" prop="productName">
        <el-input v-model="form.productName" placeholder="产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:" prop="productCode">
        <el-input v-model="form.productCode"></el-input>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="生产厂家:" prop="producerId">
        <search
          type="producer"
          show-name="producerName"
          :value="form.producerId"
          @change="changeProducer"
        >
        </search>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="设备类型:" prop="productTypeId">
        <search
          type="productType"
          show-name="deviceTypeName"
          :value="form.productTypeId"
          @change="changeType"
        >
        </search>
      </el-form-item>

      <el-form-item label="节点类别:" prop="nodeCode">
        <el-select v-model="form.nodeCode">
          <el-option
            v-for="item of Object.keys(nodeOption)"
            :key="item"
            :value="item"
            :label="nodeOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联网方式:" prop="networkMode">
        <el-select v-model="form.networkMode">
          <el-option
            v-for="item of Object.keys(networkModeOption)"
            :key="item"
            :value="item"
            :label="networkModeOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报文格式:" prop="msgType">
        <el-select v-model="form.msgType">
          <el-option
            v-for="item of Object.keys(msgTypeOption)"
            :key="item"
            :value="item"
            :label="msgTypeOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证格式:" prop="safeType">
        <el-select v-model="form.safeType">
          <el-option
            v-for="item of Object.keys(safeTypeOption)"
            :key="item"
            :value="item"
            :label="safeTypeOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDeviceProduct, addDeviceProduct, editDeviceProduct } from '@/api/sbgl/cpxx'
  import search from '@/components/search'
  export default {
    components: { search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        nodeOption: {
          '1': '直连',
          '2': '网关',
          '3': '子设备'
        },
        networkModeOption: {
          '1': 'WIFI',
          '2': '5G',
          '3': '有线网',
          '4': 'LoRA',
          '5': '其他'
        },
        msgTypeOption: {
          '1': 'JSON',
          '2': '其他'
        },
        safeTypeOption: {
          '1': '密钥',
          '2': '证书'
        },
        showSearch: false,
        form: {
          productName: '',
          productCode: '',
          producerId: '',
          producerName: '',
          productTypeId: '',
          productTypeName: '',
          nodeCode: '',
          networkMode: '',
          msgType: '',
          safeType: ''
        },
        rules: {
          productName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          productCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          producerId: [
            { required: true, message: '请输入厂家', trigger: ['blur', 'change'] }
          ],
          productTypeId: [
            { required: true, message: '请输入设备类型', trigger: ['blur', 'change'] }
          ],
          nodeCode: [
            { required: true, message: '请选择节点类别', trigger: ['blur', 'change'] }
          ],
          networkMode: [
            { required: true, message: '请选择联网方式', trigger: ['blur', 'change'] }
          ],
          msgType: [
            { required: true, message: '请选择报文格式', trigger: ['blur', 'change'] }
          ],
          safeType: [
            { required: true, message: '请选择认证格式', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changeProducer(item) {
        this.form.producerId = item.id
        this.form.productTypeName = item.producerName
      },
      changeType(item) {
        this.form.productTypeId = item.id
        this.form.producerName = item.deviceTypeName
      },
      async query() {
        infoDeviceProduct({ id: this.id }).then(res => {
          this.form = res.data
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.nodeName = this.nodeOption[this.form.nodeCode]
            if (this.type === 'add') {
              addDeviceProduct(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editDeviceProduct(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
</style>
