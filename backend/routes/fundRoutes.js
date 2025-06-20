const express = require('express');
const router = express.Router();
const { UsersModel } = require('../model/UsersModel');
const verifyUser = require("../Middlewares/verifyUser");

router.post("/addFunds", verifyUser, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    // Fetch user to check opening balance
    const user = await UsersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build the update object
    const update = {
      $inc: {
        payin: amount,
        availableMargin: amount,
      },
    };

    // If openingBalance is 0, set it to this first deposit amount
    if (user.openingBalance === 0) {
      update.$set = { openingBalance: amount };
    }

    const updatedUser = await UsersModel.findByIdAndUpdate(userId, update, { new: true });

    res.status(200).json({
      message: `Successfully added ₹${amount} to your account.`,
      availableMargin: updatedUser.availableMargin,
      payin: updatedUser.payin,
      openingBalance: updatedUser.openingBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/withdrawFunds", verifyUser, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const user = await UsersModel.findByIdAndUpdate(
      userId,
      {
        $inc: {
          availableMargin: -amount,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Successfully withdrawn ₹${amount} from your account.`,
      availableMargin: user.availableMargin,
      payin: user.payin,
      openingBalance: user.openingBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
