const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			match: /^[A-Za-z]\w*/g,
		},
		lastName: {
			type: String,
			required: true,
			match: /^[A-Za-z]\w*/g,
		},
		age: {
			type: Number,
			min: 8,
			max: 80,
		},
		address: {
			country: String,
			city: String,
			zipcode: Number,
		},
		brands: [String],
		roleId: Schema.Types.ObjectId,
	},
	{
		timestamps: true,
    versionKey: false
	}
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;