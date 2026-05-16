import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createNotification = async (req, res) => {
  try {
    const {
      title,
      message,
      type,
    } = req.body;

    const notification = new Notification({
      user: req.user._id,
      title,
      message,
      type,
    });

    const createdNotification =
      await notification.save();

    res.status(201).json(createdNotification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification =
      await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.read = true;

    const updatedNotification =
      await notification.save();

    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification =
      await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.json({
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};