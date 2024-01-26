const Player = require("../models/player.model");



module.exports.getPlayers = async (req, res) => {
    try {
        const Players = await Player.find();
        res.status(200);
        res.json(Players);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.createPlayer = async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.status(201);
        res.json(newPlayer);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.getPlayerById = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findOne({ _id: id });
        res.status(200);
        res.json(player);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.updatePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlayer = await Player.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        res.status(200);
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPlayer = await Player.deleteOne({ _id: id });
        res.status(200);
        res.json(deletedPlayer);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};