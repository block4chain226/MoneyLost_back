const mongoose = require("mongoose");
const expensesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  categoryId: { type: String, require: true },
  category: { type: String, require: true },
  userId: { type: String, require: true },
  date: { type: String, require: true },
  moneyAmount: { type: Number, require: true },
});
module.exports = mongoose.model("Expenses", expensesSchema);
