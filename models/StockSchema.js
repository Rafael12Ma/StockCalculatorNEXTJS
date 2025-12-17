import mongoose from "mongoose";



const StockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true,
        maxLength: 100
    },
    currValue: {
        type: Number,
        required: true,
    },
    boughtValue: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }

)

// StockSchema.pre("save", function () {
//     this.updatedAt = Date.now()
// })
const Stock = mongoose.models.Stock || mongoose.model("Stock", StockSchema)


export default Stock