const { default: mongoose } = require("mongoose");


const PlayerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Player Name is mandatory"],
        minLength: [2, "Player Name must be at least 2 characters"],
    },
    position: {
        type: String,
        required: false,
        enum: ["Forward", "Midfielder", "Defense", "Goalkeeper"],
    },
    status: {
        type: [String],
        required: true,
        default: ["Undecided", "Undecided", "Undecided"]
    }


}, { timestamps: true, versionKey: false });


const Player = new mongoose.model("Player", PlayerSchema);

module.exports = Player;