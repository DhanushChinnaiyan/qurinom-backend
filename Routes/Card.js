const Card = require("../Model/Card");

const router = require("express").Router();

// Get cards details router
router.get("/get", async (req, res) => {
  try {
    // Retrieve user information from middleware
    const user = req.user;

    // Find cards by user's ID
    const cards = await Card.find({ userId: user._id });

    // return success response if all process successfully executed
    res.status(200).json(cards);
  } catch (error) {
    console.log("Getting cards error", error);
    res.status(500).json({ message: "Internal server server" });
  }
});

// Create card router
router.post("/create", async (req, res) => {
  try {
    const { title, status, description } = req.body;

    // rValidate inputs
    if (!title || !status || !description)
      return res.status(500).json({ message: "Provide all details" });

    // Retrieve user information from middleware
    const user = req.user;

    // Create new card
    const newCard = await Card.create({
      title,
      description,
      status,
      userId: user._id,
      userName: user.name,
    });

    // Check if card created
    if (!newCard) {
      return res.status(404).json({ message: "Card not created" });
    }

    // return success response if all process successfully executed
    res.status(200).json({ message: "Successfully card added", card: newCard });
  } catch (error) {
    console.log("Creating cards error", error);
    res.status(500).json({ message: "Internal server server" });
  }
});

// Edite card router
router.patch("/edit/:id", async (req, res) => {
  try {
    const { title, status, description } = req.body;

    // Validate inputs
    if (!title && !status && !description)
      return res.status(500).json({ message: "Provide all details" });

    // Card details for update
    const updateFields = {};

    if (title) {
      updateFields.title = title;
    }
    if (status) {
      updateFields.status = status;
    }
    if (description) {
      updateFields.description = description;
    }

    // Update card
    const updatedCard = await Card.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateFields },
      { new: true }
    );

    // Check if card updated
    if (!updatedCard) {
      return res.status(404).json({ message: "Card not updated" });
    }

    // return success response if all process successfully executed
    res
      .status(200)
      .json({ message: "Successfully card added", card: updatedCard });
  } catch (error) {
    console.log("Editing card error", error);
    res.status(500).json({ message: "Internal server server" });
  }
});

// Delete card router
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);

    // Check if card deleted
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not deleted" });
    }

    // return success response if all process successfully executed
    res.status(200).json({ message: "Card successfully deleted", deletedCard });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
