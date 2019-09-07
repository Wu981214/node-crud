const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    username: {
      type: String, // 数据类型
      required: true, // 是否必填
    },
    password: {
        type: String, // 数据类型
        required: true, // 是否必填
      }
  },
  {
    timestamps: true, // 为每一条记录添加一个创建和修改的时间戳
  }
);

const Admin = mongoose.model('admin', modelSchema);

module.exports = Admin;
