const express = require('express')

//mounting
const router = express.Router();

//requiring route handlers (controllers)

const tourController = require('./../controllers/tourController')


router.route('/').get(tourController.getTours).post(tourController.createTour)

router.route('/:id').get(tourController.getTour).delete(tourController.delteTour).patch(tourController.updateTour)

module.exports = router