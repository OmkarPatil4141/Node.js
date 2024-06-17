const express = require('express')

//requiring route handlers (controllers)
const tourController = require('../controllers/tourController')

//mounting
const router = express.Router();

// router.param('id',tourController.checkId)



router
.route('/')
.get(tourController.getTours)
.post(tourController.createTour)
// .post(tourController.checkBody,tourController.createTour)

router
.route('/:id')
.get(tourController.getTour)
.delete(tourController.delteTour)
.patch(tourController.updateTour)

module.exports = router