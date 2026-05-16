import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    amount: Number,
    category: String,
    paymentMethod: String,
    notes: String,
    receipt: String,
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;