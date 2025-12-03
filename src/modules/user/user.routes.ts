import express from "express";

import { userControllers } from "./user.controller";
import auth from "../../middlewere/auth";

const router = express.Router();

// locaalhost:5003/users/

//routes -> controller -> service

router.post("/", userControllers.createUser )

router.get("/", auth("admin"),userControllers.getUsers)

router.get("/:id", auth("admin", "user"),userControllers.getSingleUser)

router.put("/:id", userControllers.updateUser)

router.delete("/:id", userControllers.deleteUser)


export const userRoutes = router