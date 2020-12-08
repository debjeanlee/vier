const mongoose = require("mongoose");
const { Schema } = mongoose;


const sessionSchema = new Schema(
    {
        sessionId: { type: String, required: true, unique: true },
        startTime: { type: Date, default: Date.now },
        endTime: { type: Date, default: Date.now },
        table: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table"
         },
         active: { type: Boolean, default: True },
         orders: [{
             dish: {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "Dish"
             },
             quantity: { type: Number, default: 1, required: true },
             progress: { type: Number, default: 0 },
             totalCost: Number,
             orderedAt: { type: Date, default: Date.now },
             overallDelivered: { type: Number, default: 0}
         }],
         cart: [{
             dish: {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "Dish"
             },
             quantity: { type: Number, default: 1, required: true },
         }]
    }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;