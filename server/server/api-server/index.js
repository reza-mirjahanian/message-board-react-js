'use strict';
const express = require('express'),
  constants = require('../constants'),
  channelRepo = require('../repository/channel'),

  cors = require('cors'),
  logger = require('../utils/logger');

const app = express();
app.use(cors());
app.use(express.json());


// main page
app.get('/', (req, res) => res.send('Server is running'));

// Post endpoint for querying channels
app.post('/api/:channelId', async (req, res) => {
  try {
    const {
      channelId
    } = req.params;

    const {
      message
    } = req.body;

    const newMessage =  channelRepo.createMessage({
      message,
      channelId: parseInt(channelId)
    });

    return res.status(200).send(newMessage);
  } catch (err) {
    logger.error(req.path, {
      err
    });
    res.status(500).send("Error");
  }
});

// GET endpoint for querying channels
app.get('/api/channels', async (req, res) => {
  try {
    const channels = channelRepo.getAllChannels();
    return res.status(200).send(channels);
  } catch (err) {
    logger.error(req.path, {
      err
    });
    res.status(500).send("Error");
  }
});


// GET endpoint for querying channels
app.get('/api/messages/:channelId', async (req, res) => {
  try {
    let {
      channelId
    } = req.params;
    channelId = parseInt(channelId)
    const messages = channelRepo.getAllMessages({
      channelId
    });
    return res.status(200).send(messages);
  } catch (err) {
    logger.error(req.path, {
      err
    });
    res.status(500).send("Error");
  }
});


app.listen(constants.EXPRESS_PORT, () => logger.log(`listening on port ${constants.EXPRESS_PORT}!`));
