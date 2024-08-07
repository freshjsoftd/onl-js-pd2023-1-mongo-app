require('dotenv').config();
const express = require('express');
const cors = require('cors');
// =============================
const dbMongo = require('./models');
const { players } = require('./constants/players-info');
const router = require('./routers');

const app = express();
const { Player, Role } = dbMongo;

app.use(express.json());
app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT || 5000;

const createPlayers = async () => {
	console.log('collection has been created');
	// const { Player } = dbMongo;
	await Player.insertMany(players);
};

// createPlayers();

const createRoles = async () => {
	// const {Role} = dbMongo;
	const roles = [
		{ role: 'Guru', email: 'guru@gmail.com' },
		{ role: 'Profi', email: 'prof@gmail.com' },
		{ role: 'Amator', email: 'amator@gmail.com' },
	];
	const createdRoles = await Role.create(roles);
	console.log(createdRoles)
};
// createRoles();

const getPlayers = async () => {
	const gettingPlayers = await Player.find();
	// console.log(gettingPlayers)
	gettingPlayers.forEach((player) => console.log('Player is: ', player));
};

// getPlayers()

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
