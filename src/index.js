require('dotenv').config();
const express = require('express');
const cors = require('cors');
// =============================
const dbMongo = require('./models');
const { players } = require('./constants/players-info');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const createPlayers = async () => {
  console.log('collection has been created')
	const { Player } = dbMongo;
	await Player.insertMany(players);
};

// createPlayers();

const createRoles = async () => {
  const {Role} = dbMongo;
  const roles = [
    {role: 'Admin', email: 'adm@gmail.com'},
    {role: 'Moderator'},
    {role: 'User'},
  ]
  await Role.create(roles);
}

createRoles();
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
