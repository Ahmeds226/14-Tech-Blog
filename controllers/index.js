// Import:
const router = require("express").Router();

// Calling routes:
// Api routes:
const apiRoutes = require("./api");

// Home routes:
const homeRoute = require("./homeRoute");

// Dashvoard route:
const dashboardRoute = require("./dashboardRoute");

// Routes:
// Home route:
router.use("/", homeRoute);

// Dashboard route:
router.use("/dashboard", dashboardRoute);

// Api routes:
router.use("/api", apiRoutes);

// Export:
module.exports = router;
