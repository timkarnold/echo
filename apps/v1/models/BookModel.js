module.exports = function (data) {
  var schema = data.db.Schema({
    id: {type: String, unique: true},
    title: {type: String, required: true}
  });

  schema.set('versionKey', false);
  schema.set('id', false);
  data.db.model("Book", schema);
};