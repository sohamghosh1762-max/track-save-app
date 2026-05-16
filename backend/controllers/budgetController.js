import Budget from "../models/Budget.js";

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user._id,
    });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createBudget = async (req, res) => {
  try {
    const { category, limitAmount } = req.body;

    const budget = new Budget({
      user: req.user._id,
      category,
      limitAmount,
    });

    const createdBudget = await budget.save();

    res.status(201).json(createdBudget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    budget.category =
      req.body.category || budget.category;

    budget.limitAmount =
      req.body.limitAmount || budget.limitAmount;

    budget.spentAmount =
      req.body.spentAmount || budget.spentAmount;

    const updatedBudget = await budget.save();

    res.json(updatedBudget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    await budget.deleteOne();

    res.json({
      message: "Budget deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};