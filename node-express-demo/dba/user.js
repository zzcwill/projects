// public define(modelName: String, attributes: Object, options: Object): Model
// modelName：模型名称，自定义	attributes：模型中包含都数据，每一个数据映射对应表中都每一个字段 options：模型（表）的设置

var user = sequelize.define(
  'yf_user', // 默认表名（一般这里写单数）,生成时会自动转换成复数形式。在模型访问时的model.name
  {
    uid: {
      type: Sequelize.INTEGER(11), // 字段类型
      allowNull: false, // 是否允许为NULL
      primaryKey: true, // 字段是主键
      autoIncrement: true, // 是否自增
    },
    phone: {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: false // 字段是否UNIQUE
		},
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: false // 字段是否UNIQUE
    },		
    user_name: {
      type: Sequelize.STRING(90),
      allowNull: true,
      validate: { //模型验证 当前字段值发生改变的时候进行验证
        is: ["^[a-z]+$",'i'],     // 只允许字母
        not: ["[a-z]",'i'],       // 不能使用字母
        isPhone: true
      },
      field: 'project_title' // 数据库中字段的实际名称	
    }
  },
  {
    tableName: 'yf_user', // 手动设置表的实际名称
    timestamps: false, // 是否给每条记录添加 createdAt 和 updatedAt 字段，并在添加新数据和更新数据的时候自动设置这两个字段的值，默认为true
    paranoid: true, // 设置 deletedAt 字段，当删除一条记录的时候，并不是真的销毁记录，而是通过该字段来标示，即保留数据，进行假删除，默认为false
    freezeTableName: false, // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 默认为false
    indexes: [] // 定义表索引
  }
)

// 表同步:没有就新建,有就不变
// project.sync();

// 表同步:没有就新建,有就先删除再新建
// project.sync({
//     force: true
// });