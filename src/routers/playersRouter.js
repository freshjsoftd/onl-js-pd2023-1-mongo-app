const { Router } = require('express');

const playerCtrl = require('../controllers/playersController');

const { paginate } = require('../middlewares');

const playerRouter = new Router();

playerRouter
.route('/')
.get(paginate.paginate, playerCtrl.getAllPlayers);

module.exports = playerRouter;
