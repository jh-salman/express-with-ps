import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response)=>{

    // const {name, email, password} = req.body;

    try {
        

        const result = await userServices.createUser(req.body)

        res.status(201).json({
            success: true,
            message: "Data inserted successfully",
            data: result.rows[0]
        })
        
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

    
}

const getUsers = async (req: Request, res: Response)=>{
    try {
        
        // const result = await pool.query(`SELECT * FROM users`);

        const result = await userServices.getUsers()
        res.status(200).json({
            success: true,
            message: "User fetch successfully",
            data: result.rows
        })

    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: "Error occurred while fetching users"
        })
    }
}



const getSingleUser = async(req: Request, res: Response)=> {

         
    
        try {
            // const result = await pool.query(`SELECT * FROM users WHERE id =$1`, [req.params.id]);
    
    
            const result = await userServices.getSingleUser(req.params.id as string)
    
            if(result.rows.length === 0){
                res.status(400).json({
                success: false,
                message: "No user found",
                
            })
            }
           else {
            res.status(200).json(({
                success: true,
                message: "User found successfully",
                data: result.rows[0]
            }))
           }
    
        } catch (err: any) {
            res.status(400).json({
                success: false,
                message: err.message,
                details: "Error occurred while fetching single user"
            })
            
        }
    }


const updateUser = async(req: Request, res: Response)=>{
    // console.log(req.params.id)

    const {name, email} = req.body;
    console.log(name, email)
     

    try {
        // 
        
        const result = await userServices.updateUser(name, email, req.params.id as string)

        if(result.rows.length === 0){
            res.status(400).json({
            success: false,
            message: "No user found to update",
            
        })
        }
       else {
        res.status(200).json(({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        }))
       }

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message,
            details: "Error occurred while update single user"
        })
        
    }
}

const deleteUser = async(req: Request, res: Response)=>{
    // console.log(req.params.id)
     

    try {
        const result = await userServices.deleteUser(req.params.id as string);


        if(result.rowCount=== 0){
            res.status(400).json({
            success: false,
            message: "No user found to delete",
            
        })
        }
       else {
        res.status(200).json(({
            success: true,
            message: "User deleted successfully",
            data: result.rows
        }))
       }

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message,
            details: "Error occurred while deleting single user"
        })
        
    }
}


export const userControllers = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}