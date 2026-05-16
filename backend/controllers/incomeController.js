import Income from "../models/Income.js";

export const getIncome = async (req, res) => {
  try {
    const income = await Income.find({
      user: req.user._id,
    });

    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addIncome = async (req, res) => {
  try {
    const { source, amount } = req.body;

    const income = new Income({
      user: req.user._id,
      source,
      amount,
    });

    const createdIncome = await income.save();

    res.status(201).json(createdIncome);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    await income.deleteOne();

    res.json({
      message: "Income deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};