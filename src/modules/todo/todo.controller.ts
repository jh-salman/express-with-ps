import { Request, Response } from "express";
import { todosServices } from "./todo.service";

const createTodo = async(req : Request, res: Response)=>{
    
    const {user_id, title} = req.body;

    try {
        const result = await todosServices.createTodo(user_id , title )
        res.status(201).json(({
            success:true,
            message: "Todo created",
            data: result.rows[0]
        }))         
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
const getTodos = async (req: Request, res: Response)=>{
    try {
        
        // const result = await pool.query(`SELECT * FROM users`);

        const result = await todosServices.getTodos()
        res.status(200).json({
            success: true,
            message: "Todos fetch successfully",
            data: result.rows
        })

    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: "Error occurred while fetching todos"
        })
    }
}

const getSingleTodo = async(req: Request, res: Response)=>{
    // console.log(req.params.id)
     

    try {
        // const result = await pool.query(`SELECT * FROM users WHERE id =$1`, [req.params.id]);                            
        const result = await todosServices.getSingleTodo(req.params.id as string)

        if(result.rows.length === 0){
            res.status(400).json({
            success: false,
            message: "No todo found",
            
        })
        }
       else {
        res.status(200).json(({
            success: true,
            message: "Todo found successfully",
            data: result.rows[0]
        }))
       }

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message,
            details: "Error occurred while fetching single todo"
        })
        
    }
}

const updateTodo = async(req: Request, res: Response)=>{
    // console.log(req.params.id)

    const {title, description, completed, due_date} = req.body;
   
     

    try {
        // 
        const result = await todosServices.updateTodo(title , description, completed, due_date, req.params.id as string)

        if(result.rows.length === 0){
            res.status(400).json({
            success: false,
            message: "No todo found to update",
            
        })
        }
       else {
        res.status(200).json(({
            success: true,
            message: "Todo updated successfully",
            data: result.rows[0]
        }))
       }

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message,
            details: "Error occurred while update single todo"
        })
        
    }
}

const deleteTodo =  async(req: Request, res: Response)=>{
    // console.log(req.params.id)
     

    try {
        const result = await todosServices.deleteTodo(req.params.id as string)

        // console.log(result) 
        if(result.rowCount=== 0){   
            res.status(400).json({
            success: false,
            message: "No todo found to delete",
            
        })
        }
       else {
        res.status(200).json(({
            success: true,
            message: "Todo deleted successfully",
            data: result.rows
        }))
       }

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message,
            details: "Error occurred while deleting single todo"
        })
        
    }
}   
export const todosController = {
    createTodo,
    getTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo
}