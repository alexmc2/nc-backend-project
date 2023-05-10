GET /categories - FLOW

- A request is made to the /api/categories route.
- The getAllCategories function (categories.controller.js) executed.
- If error retrieving categories, the catch block executed - next(err) is called.
- Express finds next error handling MW function in stack.
- Error handling MW in app.js is executed((err, req, res, next) => { ... })
