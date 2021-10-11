const express = require("express");
const UserController = require("../controllers/UserController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.userSignUp);
router.post("/login", UserController.userLogin);

router.use(checkAuthMiddleware.checkAuth);
router.get("/", UserController.userIndex);
router.get("/:id", UserController.userDetails);
router.put("/:id", UserController.userUpdate);
router.delete("/:id", UserController.userDelete);

module.exports = router;
