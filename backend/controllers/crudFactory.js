function crudFactory(Model, { sortField = "order" } = {}) {
  return {
    list: async (req, res, next) => {
      try {
        const docs = await Model.find().sort({ [sortField]: 1, createdAt: 1 });
        res.json(docs);
      } catch (err) {
        next(err);
      }
    },

    getOne: async (req, res, next) => {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return res.status(404).json({ error: "Not found." });
        res.json(doc);
      } catch (err) {
        next(err);
      }
    },

    create: async (req, res, next) => {
      try {
        const doc = await Model.create(req.body);
        res.status(201).json(doc);
      } catch (err) {
        next(err);
      }
    },

    update: async (req, res, next) => {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!doc) return res.status(404).json({ error: "Not found." });
        res.json(doc);
      } catch (err) {
        next(err);
      }
    },

    remove: async (req, res, next) => {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ error: "Not found." });
        res.json({ success: true });
      } catch (err) {
        next(err);
      }
    },
  };
}

module.exports = crudFactory;
