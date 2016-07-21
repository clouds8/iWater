var dbPath = require('../config').DbPath;
var mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(dbPath);
  var db = mongoose.connection;
  db.on('error', function (err) {
    console.error(err);
    process.exit(1);
  });
  db.on('open', function () {
    console.log('mongodb connected!');
  });
  return db;
}
