const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    name: {
      type: String, // 数据类型
      required: true, // 是否必填
    },
    img:{
      type:String
    },
    price:{
        type:Number
    },
    _category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
     }
  },
  {
    timestamps: true, // 为每一条记录添加一个创建和修改的时间戳
  }
);

const Product = mongoose.model('product', modelSchema);

module.exports = Product;
