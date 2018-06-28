var mongoose = require('mongoose');

var userSchema = require('../schemas/users');

module.export = mongoose.model('user', userSchema);