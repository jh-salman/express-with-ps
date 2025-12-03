import express, { Request, Response } from "express";

import config from "./config";
import { initDB, pool } from "./config/db";
import { logger } from "./middlewere/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
//db initialize
initDB()
// logger middlewere

//Parser 
app.use(express.json());
// app.use(express.urlencoded())

app.get("/",logger,(req: Request ,res: Response)=>{
    res.send("Hello next level developers")
})

// Users create
app.use("/users", userRoutes )

// app.post("/users")
// Get users 
// app.use("/users", userRoute call ->  router.post("/", userController.createUser --> userServices(business logic + db )  ) router )

//Get all users

app.use("/users", userRoutes )

//get single user
app.use("/users/:id", userRoutes )

//Update Single user

app.use("/users/:id", userRoutes )

//Delete  Single user

app.use("/users/:id", userRoutes)


// Todos crud operations

app.use("/todos", todosRoutes )

//Get all todos 
app.use("/todos", todosRoutes )

//get single todo
app.use("/todos/:id", todosRoutes)

//Update Single todo

app.put("/todos/:id", todosRoutes)

//Delete  Single todo

app.delete("/todos/:id", todosRoutes)

/// Auth routes

app.use("/auth", authRoutes)




// 404 not found
app.use((req, res)=>{
    res.status(404).json({
        success:false,
        message: "Route not found",
        path:req.path
    })
})




export default app;