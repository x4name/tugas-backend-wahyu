'use strict';

const express = require('express');
const router = express.Router();
exports.router = router;
const skillController = require('../controllers/skillController');

// Route untuk CRUD Projects
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', skillController.createSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;