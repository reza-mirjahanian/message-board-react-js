'use strict';

const logger = require('../utils/logger'),
  constants = require('../constants'),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash');

// In-file database
const locallydb = require('locallydb');
const db = new locallydb('./server/repository/db-channel');
let channelDB = db.collection(constants.DB.channel);
let messageDB = db.collection(constants.DB.message);


class Channel {

  /**
   * Insert some mock Data
   * @return {boolean}
   */
  static insertMockData() {
    try {
      Channel.removeAll();
      channelDB.insert([{
          name: 'Channel1'
        },
        {
          name: 'Channel2'
        },
        {
          name: 'Channel3'
        },
      ]);
      messageDB.insert([{
          channelId: 0,
          message: 'message1 (1)',
        },
        {
          channelId: 0,
          message: 'message2 (1)',
        },
        {
          channelId: 0,
          message: 'message3 (1)',
        },
        {
          channelId: 2,
          message: 'message4 (3)',
        },
        {
          channelId: 2,
          message: 'message5 (3)',
        }
      ]);
      return true;
    } catch (e) {
      logger.error("Channel:insertMockData()", e);
      return false;
    }


  }

  /**
   * Clean table
   * @return {boolean}
   */
  static removeAll() {
    try {
      let dbChannelAddress = path.resolve(__dirname, './db-channel/' + constants.DB.channel);
      let dbMessageAddress = path.resolve(__dirname, './db-channel/' + constants.DB.message);

      fs.unlinkSync(dbChannelAddress);
      fs.unlinkSync(dbMessageAddress);
      channelDB = db.collection(constants.DB.channel);
      messageDB = db.collection(constants.DB.message);
      logger.log("Database is cleaned");
      return true;
    } catch (e) {
      logger.error("Channel:removeAll()", e);
      return false;
    }
  }

  /**
   * Return all Channel
   * @return {Promise< {Object[]}|null>}
   */
  static getAllChannels() {
    try {
      return channelDB.items;
    } catch (e) {
      logger.error("Channel:getAllChannels()", e);
      return null;
    }
  }

  /**
   * Return all Message
   * @param  {Object}
   * @return {Promise< {Object[]}|null>}
   */
  static getAllMessages({
    channelId
  }) {
    try {
      return messageDB.where({
        channelId
      }).items;
    } catch (e) {
      logger.error("Channel:getAllMessages()", e);
      return null;
    }
  }


  /**
   * Create new channel
   * @param  {Object}
   * @return {Number}
   */
  static createChannel({
    name = ''
  }) {
    try {
      if (!name || _.size(name) < 1) {
        return -1
      }

      //Return Id of inserted
      return channelDB.insert({
        name
      });

    } catch (e) {
      logger.error("Channel:createChannel()", e);
      return -1;
    }
  }

  /**
   * Create new message for a channel
   * @param  {Object}
   * @return {Number}
   */
  static createMessage({
    message = '',
    channelId
  }) {
    try {
      if (!message || _.size(message) < 1) {
        return -1
      }

      //Return Id of inserted
      const cid = messageDB.insert({
        message,
        channelId,
      });
      let newItem = messageDB.where({
        cid
      }).items;
      return newItem[0];

    } catch (e) {
      logger.error("Channel:createMessage()", e);
      return -1;
    }
  }




}

module.exports = Channel;
