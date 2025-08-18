const createError = require('http-errors');

const { Player, Role } = require('../models');
const { ObjectId } = require('mongodb');

class PlayerController {
	async getAllPlayers(req, res, next) {
		try {
			const { limit, offset } = req.pagination;
			const players = await Player.find(
				{},
				{
					firstName: 1,
					lastName: 1,
					age: 1,
					'address.country': 1,
					_id: 0,
				}
			)
				.sort({ lastName: 1 })
				.limit(limit)
				.skip(offset);
			if (players) {
				console.log(`Players are: ${JSON.stringify(players, null, 2)}`);
				res.status(200).json(players);
			} else {
				console.log('Any players have not been found');
				next(createError(404, 'Any players have not been found'));
			}
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	}

	async getPlayerById(req, res, next) {
		try {
			const { id } = req.params;
			console.log(id);
			const player = await Player.findById(
				{ _id: id },
				{
					firstName: 1,
					lastName: 1,
					age: 1,
					'address.country': 1,
					_id: 0,
				}
			);
			if (player) {
				console.log(`Player is: ${JSON.stringify(player, null, 2)}`);
				res.status(200).json(player);
			} else {
				console.log('Player has not been found');
				next(createError(404, 'Player has not been found'));
			}
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	}

	async getVeterans(req, res, next) {
		try {
			const { age } = req.query;
			console.log(age);
			const veterans = await Player.find(
				{ age: { $gte: age } },
				{
					firstName: 1,
					lastName: 1,
					age: 1,
					_id: 0,
				}
			);
			if (veterans) {
				console.log(`Player is: ${JSON.stringify(veterans, null, 2)}`);
				res.status(200).json(veterans);
			} else {
				console.log('Any players have not been found');
				next(createError(404, 'Any players have not been found'));
			}
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	}

	async addPlayer(req, res, next) {
		const { body } = req;
		console.log(body);
		try {
			const createdPlayer = await Player.create(body);
			console.log(createdPlayer);
			if (createdPlayer) {
				console.log(
					`Created player is ${JSON.stringify(
						createdPlayer,
						null,
						2
					)}`
				);
				res.status(200).json(createdPlayer);
			} else {
				console.log('Can not create player');
				next(createError(400, 'Can not create player'));
			}
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	}

	async patchPlayers(req, res, next) {
		try {
			const { body } = req;
			console.log(body);
			const {roleId, age} = body
			const updatedPlayers = await Player.updateMany(
				{age: {$gte: age}},
				{$set: {roleId:  new ObjectId(roleId)}}
			)
			if (updatedPlayers.acknowledged) {
				console.log(`${updatedPlayers.modifiedCount} players have been modified`);
				res.status(200).json(updatedPlayers.modifiedCount);
			} else {
				console.log('Can not change players');
				next(createError(400, 'Can not change players'));
			}
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	}
}

module.exports = new PlayerController();
