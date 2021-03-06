var db = require("../models");

module.exports = function(app) {
  // Get all cards
  app.get("/api/card", async (req, res) => {
    try {
      const data = await db.Card.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Add a card
  app.post("/add", async (req, res) => {
    try {
      const { cardName, cardDef, example, topic, subject } = req.body;
      const errors = [];

      // Validate Fields
      if (!cardName) {
        errors.push({ text: "Please add a cardName" });
      }
      if (!cardDef) {
        errors.push({ text: "Please add some cardDef" });
      }
      if (!example) {
        errors.push({ text: "Please add some cardDef" });
      }
      if (!topic) {
        errors.push({ text: "Please add a topic" });
      }
      if (!subject) {
        errors.push({ text: "Please add a contact email" });
      }

      // Check for errors
      if (errors.length > 0) {
        res.render("/add", {
          errors,
          cardName,
          cardDef,
          example,
          topic,
          subject
        });
      }

      // Insert into Topic table
      Topic.create({ topic });

      // Insert into Subject table
      Subject.create({ subject });

      // Insert into Card table
      Card.create({
        cardName,
        cardDef,
        example
      });
      res.redirect("/");
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Search for card
  app.get("/search", async (req, res) => {
    try {
      const term = await db.Card.findAll(req.body);

      // Make lowercase
      term = term.toLowerCase();

      Card.findAll({ where: { cardName: { [Op.like]: "%" + term + "%" } } });
      res.render("/card", { cardName });
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new topic
  app.post("/api/topics", async (req, res) => {
    try {
      const result = await db.Topic.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Get all subjects
  app.get("/api/subjects", async (req, res) => {
    try {
      const data = await db.Subject.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new topic
  app.post("/api/subjects", async (req, res) => {
    try {
      const result = await db.Subject.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Get all cards
  app.get("/api/cards", async (req, res) => {
    try {
      const data = await db.Card.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new topic
  app.post("/api/cards", async (req, res) => {
    try {
      const result = await db.Card.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Delete an topic by id
  app.delete("/api/cards/:id", async (req, res) => {
    try {
      const result = await db.Card.destroy({ where: { id: req.params.id } });
      const deletedRowCount = result;
      const status = deletedRowCount > 0 ? 200 : 404;
      res.status(status).json({ deletedRowCount });
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });
};
