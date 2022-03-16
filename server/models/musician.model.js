const mongoose = require("mongoose");
const { Schema } = mongoose;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const MusicianSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name_korea: String,
  name_english: String,
  email: String,
  register_data: String,
  image: { type: String, default: "None" },
  description: { type: String, default: "None" },
  contract_accress: { type: String, default: "None" },
  like: { type: [Number], default: [] },
});
MusicianSchema.plugin(autoIncrement.plugin, {
  model: "Musician",
  field: "id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = {
  MusicianModel: mongoose.model("Musician", MusicianSchema),
};
