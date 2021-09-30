'use strict';
const expect = require('chai').expect;
require('../../server/api-server'); //@todo maybe cleanup

const constants = require('../../server/constants');
const channelRepo = require('../../server/repository/channel');
const axios = require('axios');
const _ = require('lodash');

const SERVER_URL = `http://localhost:${constants.EXPRESS_PORT}/`;



suite('Testing Express API routes', () => {

  suite('GET /', () => {
    test('should respond with "Server is running" ', async () => {
      const {
        data: response
      } = await axios.get(SERVER_URL);
      expect(response).to.equal("Server is running")
    });
  });

  suite('POST /api/:channelId', () => {
    test('should insert data correctly" ', async () => {
      channelRepo.removeAll();
      ////
      const message = "Some Text"
      const channelId = 6;
      await axios.post(SERVER_URL + 'api/' + channelId, {
        message
      });
      const data = channelRepo.getAllMessages({
        channelId
      });
      expect(data).to.be.an('array').that.have.lengthOf(1);
      expect(data[0]).to.have.all.keys('message', 'cid', 'channelId', '$created', '$updated');
      expect(data[0].message).to.be.equal(message);
      expect(data[0].channelId).to.be.equal(channelId);
      /////////////////////////
      const message2 = "Some Text 2"
      await axios.post(SERVER_URL + 'api/' + channelId, {
        message: message2
      });
      const data2 = channelRepo.getAllMessages({
        channelId
      });
      expect(data2).to.be.an('array').that.have.lengthOf(2);
      expect(_.map(data2, 'channelId')).to.have.deep.equal([
        channelId , channelId
      ]);
      expect(_.map(data2, 'message')).to.have.deep.equal([
        message, message2
      ]);
      // ///
      const message3 = "Some Text 3"
      const channelId3 = 4
      await axios.post(SERVER_URL + 'api/' + channelId3, {
        message: message3
      });
      const data3 = channelRepo.getAllMessages({
        channelId: channelId3
      });

      expect(data3).to.be.an('array').that.have.lengthOf(1);
      expect(_.map(data3, 'channelId')).to.have.deep.equal([
        channelId3
      ]);
      expect(_.map(data3, 'message')).to.have.deep.equal([
        message3
      ]);


    });
  });

  suite('GET /api/channels', () => {
    test('should return all channels data" ', async () => {
      channelRepo.insertMockData();
      const {
        data
      } = await axios.get(SERVER_URL + 'api/channels');
      expect(_.map(data, 'name')).to.have.deep.equal([
        'Channel1', 'Channel2', 'Channel3'
      ]);

    });
  });

  suite('GET /api/messages', () => {
    test('should return all channels data" ', async () => {
      channelRepo.insertMockData();
      const channelId = 2;
      const {
        data
      } = await axios.get(SERVER_URL + 'api/messages/' + channelId);

      expect(data).to.be.an('array').that.have.lengthOf(2);
      expect(_.map(data, 'message')).to.have.deep.equal([
        'message4 (3)', 'message5 (3)'
      ]);
      expect(_.map(data, 'channelId')).to.have.deep.equal([
        channelId, channelId
      ]);
    });
  });

});
