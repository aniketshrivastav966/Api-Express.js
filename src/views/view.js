const express = require("express");
const router = express.Router();
const userController = require("../controller/controller")

router.get("/", userController.getAll);
router.get("/getById/:id", userController.getById)
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete)
module.exports = router
