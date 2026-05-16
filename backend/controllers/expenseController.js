import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  const expense = new Expense({
    user: req.user._id,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    paymentMethod: req.body.paymentMethod,
    notes: req.body.notes,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
};