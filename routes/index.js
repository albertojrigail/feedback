// routes/index.js
const feedbackRoutes = require('./feedback_routes');
const solutionRoutes = require('./solution_routes');
const problemRoutes = require('./problem_routes');
const userRoutes = require('./user_routes');
const emailRoutes = require('./email_routes');
module.exports = function(app, db) {
    feedbackRoutes(app, db);
    solutionRoutes(app, db);
    problemRoutes(app, db);
    userRoutes(app, db);
    emailRoutes(app, db);
}