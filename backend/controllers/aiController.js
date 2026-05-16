export const getAIInsights = async (req, res) => {
  try {
    const insights = [
      "Your savings are improving this month.",
      "Food expenses increased compared to last week.",
      "You are maintaining a healthy financial balance.",
      "Try reducing subscription expenses to save more.",
      "Your recurring expenses are stable this month."
    ];

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};