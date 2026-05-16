import Goal from "../models/Goal.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createGoal = async (req, res) => {
  try {
    const {
      name,
      targetAmount,
      currentAmount,
      deadline,
    } = req.body;

    const goal = new Goal({
      user: req.user._id,
      name,
      targetAmount,
      currentAmount,
      deadline,
    });

    const createdGoal = await goal.save();

    res.status(201).json(createdGoal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    goal.name = req.body.name || goal.name;

    goal.targetAmount =
      req.body.targetAmount || goal.targetAmount;

    goal.currentAmount =
      req.body.currentAmount || goal.currentAmount;

    goal.deadline =
      req.body.deadline || goal.deadline;

    const updatedGoal = await goal.save();

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    await goal.deleteOne();

    res.json({
      message: "Goal deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};