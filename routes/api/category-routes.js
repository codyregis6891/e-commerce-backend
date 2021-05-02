const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const data = Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const data = Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const data = Category.create({
      ...req.body
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const data = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const data = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
