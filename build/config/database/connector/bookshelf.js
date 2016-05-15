'use strict';

/*
 * Knex
 */
var knex = require('./knex');

/*
 * Bookshelf (ORM)
 */
module.exports = require('bookshelf')(knex);