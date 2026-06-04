'use strict';

const express = require('express');
const router = express.Router();
exports.router = router;
const projectController = require('../controllers/projectController');

// Route untuk CRUD Projects
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;