require('dotenv').config();
const express = require('express');
const cors = require('cors');
// =============================
const dbMongo = require('./models');
const { players } = require('./constants/players-info');

const app = express();
const { Player, Role } = dbMongo;

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const createPlayers = async () => {
  console.log('collection has been created')
	// const { Player } = dbMongo;
	await Player.insertMany(players);
};

// createPlayers();

const createRoles = async () => {
  // const {Role} = dbMongo;
  const roles = [
    {role: 'Admin', email: 'adm@gmail.com'},
    {role: 'Moderator', email: 'mod@gmail.com'},
    {role: 'User', email: 'user@gmail.com'},
  ]
  await Role.create(roles);
};
// createRoles();


const getPlayers = async () => {
  const gettingPlayers = await Player.find()
  // console.log(gettingPlayers)
  gettingPlayers.forEach(player => console.log('Player is: ', player))
}

// getPlayers()

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
