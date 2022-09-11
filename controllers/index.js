// Import:
const router = require("express").Router();

// Calling routes:
// Api routes:
const apiRoutes = require("./api");

// Home routes:
const homeRoute = require("./homeRoute.js");

// Routes:
// Home route:
router.use("/", homeRoute);

// Api routes:
router.use("/api", apiRoutes);

// Export:
module.exports = router;
