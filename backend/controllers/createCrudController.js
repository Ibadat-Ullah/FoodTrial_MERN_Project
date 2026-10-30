const asyncHandler = require('./asyncHandler');

const createCrudController = (Model, { prepareBody } = {}) => ({
  getAll: asyncHandler(async (req, res) => {
    const documents = await Model.find().sort({ createdAt: -1 });
    res.json(documents);
  }),

  getOne: asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json(document);
  }),

  create: asyncHandler(async (req, res) => {
    const body = prepareBody ? await prepareBody(req, 'create') : req.body;
    const document = await Model.create(body);
    res.status(201).json(document);
  }),

  update: asyncHandler(async (req, res, next) => {
    const body = prepareBody ? await prepareBody(req, 'update') : req.body;
    const document = await Model.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true
    });
    if (!document) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json(document);
  }),

  remove: asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: 'Resource deleted successfully' });
  })
});

module.exports = createCrudController;
