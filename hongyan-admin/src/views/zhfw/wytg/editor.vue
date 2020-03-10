<template>
  <div class="rich-editor">
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    />
  </div>
</template>
<script>
// 富文本配置
const editorConfig = {
  placeholder: '请输入内容',
  modules: {
    toolbar: [
      [{ size: ['small', false, 'large'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['image'],
    ],
  },
}
export default {
  name: 'Editor',
  props: {
    content: {
      type: String,
      default: () => {
        return ''
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  data() {
     return {
        addImgRange: '',
        imageLoading: false,
        editorOption: editorConfig,
        html: ''
      }
  },
  mounted() {
    if (this.placeholder) {
      this.editorOption.placeholder = this.placeholder
    }
  },
  methods: {
    onEditorChange(v) {
      this.$emit('update:content', v.html)
    },
  },
}
</script>
<style lang="scss">
  .quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    padding-bottom: 1rem;
  }
.ql-toolbar.ql-snow{
    height:30px;
    line-height: 20px;
    padding:3px;
}
.ql-container{
    height:300px;
    strong{
        font-weight: bold;
    }
}
.ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6{
    font-family: PingFangSC-Regular,helvetica neue,Microsoft Yahei,Avenir,Helvetica,Arial,sans-serif;
}
.ql-editor.ql-blank::before{
    font-style: normal;
}
.rich-editor{
    position: relative;
}
.loading-box{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
