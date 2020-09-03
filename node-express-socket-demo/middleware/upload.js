var path = require('path');
var multer  = require('multer');
var uuid = require('uuid');
var { getNowDay } = require('../extend/time');

//设置保存规则
var storage = multer.diskStorage({
  //destination：字段设置上传路径，可以为函数
  destination: path.resolve(__dirname, '../public/uploads'),
  //filename：设置文件保存的文件名
  filename: function(req, file, cb) {
      var extName = file.originalname.slice(file.originalname.lastIndexOf('.'));
      var fileName = uuid.v1();
      var date = getNowDay();
      cb(null, fileName + '-' + date + extName);
  }
})
//设置过滤规则（可选）
var imageFilter = function(req, file, cb){
  var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  //微信公众号只接收上述四种类型的图片
  if(acceptableMime.indexOf(file.mimetype) !== -1){
      cb(null, true)
  }else{
      cb(null, false)
  }
}
//设置限制（可选）
var imageLimit = {
  fieldSize: '2MB'
}
//创建 multer 实例
var imageUploader = multer({ 
  storage: storage,
  fileFilter: imageFilter,
  limits: imageLimit
}).single('file', 12)    //定义表单字段、数量限制

module.exports = {
	imageUploader
}