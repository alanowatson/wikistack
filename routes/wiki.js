const express = require('express');
const wikiRouter = express.Router();
const { addPage } = require('../views');
const { Page } = require('../models');
// const client = require('../db/index.js')

wikiRouter.get('/', async (req, res) => {
  res.send('<h1>Hi there</h1>');
});

wikiRouter.post('/', async (req, res) => {
  const bodyTitle = req.body.title;
  const bodyContent = req.body.content;
  try {
    const page = await Page.create({
      title: bodyTitle,
      content: bodyContent,
    });

    page.afterCreate(res.redirect('/'));
  }
});

wikiRouter.get('/add', async (req, res) => {
  res.send(addPage());
});

module.exports = wikiRouter;
