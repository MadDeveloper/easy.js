'use strict';

/*
 * Not working!
 */

var params = require(__dirname + '/../../config').database;
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + params.connection.host + '/' + params.connection.database);

module.exports = mongoose;