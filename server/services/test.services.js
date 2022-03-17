var {
  AlbumModel,
  MusicianModel,
  PlaylistModel,
  StoneModel,
  TradeModel,
  TransactionModel,
  UserModel,
  TestModel,
} = require("../models/index");

var saveTestData = async () => {
  try {
    var data = await getTestData({ email: "test@test.com" });
    if (data.length) {
      console.log("data exist");
    } else {
      console.log("data not exist");
      return makeTestData({
        email: "test@test.com",
        name: "test",
        age: 26,
        intarr: [1, 2, 3],
      });
    }
  } catch (e) {
    throw Error("Error");
  }
};
var makeTestData = async (query) => {
  try {
    const newTestModel = new TestModel(query);
    return newTestModel.save();
  } catch (e) {
    throw Error("Error");
  }
};
var getTestData = async (query) => {
  try {
    return TestModel.find(query);
  } catch (e) {
    throw Error("Error");
  }
};
var getAllDataInTestTable = async () => {
  try {
    return TestModel.find();
  } catch (e) {
    throw Error("Error");
  }
};
var setAllTestData = async () => {
  // var query;
  // query = { name: "아이유", account: "0x0001" };
  // UserModel.findOneAndUpdate(query, query, {
  //   upsert: true,
  // }).exec();
  const User1 = new UserModel();
  // User1.id = 1;
  User1.musician_id = 0;
  User1.name = "아이유";
  User1.account = "0x0001";
  // User1.register_date= Date.now;
  // User1.playlist_id_array = [];
  User1.save();

  const User2 = new UserModel();
  User2.name = "박우현";
  User2.account = "0x0002";
  User2.save();

  const User3 = new UserModel();
  User3.name = "박재범";
  User3.account = "0x0003";
  User3.save();

  const User4 = new UserModel();
  User4.name = "고은초롱";
  User4.account = "0x0004";
  User4.save();

  const Musician1 = new MusicianModel();
  Musician1.name_korea = "아이유";
  Musician1.name_english = "IU";
  Musician1.email = "iu@iu.com";
  Musician1.image =
    "data:image/jpeg;base64,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";
  Musician1.description = "~~IU~~";
  Musician1.save();

  const Musician2 = new MusicianModel();
  Musician2.name_korea = "박재범";
  Musician2.name_english = "Jay Park";
  Musician2.email = "Jay@Park.com";
  Musician2.image =
    "data:image/jpeg;base64,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";
  Musician2.description = "~~Jay Park~~";
  Musician2.save();

  ////////////////////////////////////////////////// Album 1 (Stone 1-1, 1-2)
  const Album1 = new AlbumModel();
  Album1.musician_id = 1;
  Album1.name = "IU 1집";
  Album1.image =
    "https://3.bp.blogspot.com/-s18XqWTLBWk/UYTatUE1jrI/AAAAAAAAHd4/vQR4G3wm1mE/s1600/%EC%95%84%EC%9D%B4%EC%9C%A0+-+Growing+Up.jpg";
  Album1.save();

  const Stone1_1 = new StoneModel();
  Stone1_1.musician_id = 1;
  Stone1_1.album_id = 1;
  Stone1_1.name = "Boo";
  Stone1_1.description = "BooBooBoo";
  Stone1_1.category = "kpop";
  Stone1_1.save();

  const Stone1_2 = new StoneModel();
  Stone1_2.musician_id = 1;
  Stone1_2.album_id = 1;
  Stone1_2.name = "있잖아";
  Stone1_2.description = "있잖아 Desc";
  Stone1_2.category = "kpop";
  Stone1_2.save();

  ////////////////////////////////////////////////// Album 2 (Stone 2-1, 2-2)
  const Album2 = new AlbumModel();
  Album2.musician_id = 2;
  Album2.name = "박재범 1집";
  Album2.image =
    "http://bimage.interpark.com/goods_image/9/6/7/0/209839670s.jpg";
  Album2.save();

  const Stone2_1 = new StoneModel();
  Stone2_1.musician_id = 2;
  Stone2_1.album_id = 1;
  Stone2_1.name = "Know Your Name";
  Stone2_1.description = "First Title";
  Stone2_1.category = "rap";
  Stone2_1.save();

  const Stone2_2 = new StoneModel();
  Stone2_2.musician_id = 2;
  Stone2_2.album_id = 1;
  Stone2_2.name = "Up And Down";
  Stone2_2.description = "Second Song";
  Stone2_2.category = "rap";
  Stone2_2.save();

  ////////////////////////////////////////////////// Album 3 (Stone 3-1)
  const Album3 = new AlbumModel();
  Album3.musician_id = 1;
  Album3.name = "IU 2집";
  Album3.image = "http://i.maniadb.com/images/album_t/260/687/687918_1_f.jpg";
  Album3.save();

  const Stone3_1 = new StoneModel();
  Stone3_1.musician_id = 1;
  Stone3_1.album_id = 2;
  Stone3_1.name = "너랑 나";
  Stone3_1.description = "You And I";
  Stone3_1.category = "kpop";
  Stone3_1.save();

  const Playlist1 = new PlaylistModel();
  Playlist1.user_id = 2;
  Playlist1.stone_id_arr = [1, 3, 5];
  Playlist1.save();

  const Playlist2 = new PlaylistModel();
  Playlist2.user_id = 4;
  Playlist2.stone_id_arr = [1, 2, 3, 4, 5];
  Playlist2.save();

  const TradeList1 = new TradeModel();
  TradeList1.stone_id = 3;
  TradeList1.sell_user_id = 2;
  TradeList1.price = 100;
  TradeList1.amount = 33;
  TradeList1.save();

  const TradeList2 = new TradeModel();
  TradeList2.stone_id = 1;
  TradeList2.sell_user_id = 1;
  TradeList2.price = 100;
  TradeList2.amount = 22;
  TradeList2.save();
};

module.exports = {
  saveTestData: saveTestData,
  makeTestData: makeTestData,
  getTestData: getTestData,
  getAllDataInTestTable: getAllDataInTestTable,
  setAllTestData: setAllTestData,
};