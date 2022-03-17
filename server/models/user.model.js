const mongoose = require("mongoose");
const { Schema } = mongoose;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
  id: { type: Number, required: true },
  musician_id: { type: Number, default: 0 },
  name: String,
  account: String,
  register_date: { type: String, default: Date.now },
  playlist_id_array: { type: [Number], defualut: [] },
});
UserSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = {
  UserModel: mongoose.model("User", UserSchema),
};
