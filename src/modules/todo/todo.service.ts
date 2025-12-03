import { pool } from "../../config/db"

const createTodo = (user_id :string, title: string)=>{
    const result = pool.query(`INSERT INTO todos(user_id, title ) VALUES($1, $2) RETURNING *`, [user_id, title])
    return result
}

const getTodos = async()=>{

    const result = await pool.query(`SELECT * FROM todos`);
    return result   
}

const getSingleTodo = async(id: string)=>{
   const result = await pool.query(`SELECT * FROM todos WHERE id=$1` ,[id])
   return result
}
const updateTodo= async(title :string, description:string, completed:boolean, due_date: string, id:string)=>{
     const result = await pool.query(`UPDATE todos SET title=$1, description=$2, completed=$3, due_date=$4 WHERE id=$5 RETURNING *`, [title, description, completed, due_date, id])
     return result
}
const deleteTodo = async(id: string)=>{
    const result = await pool.query(`DELETE FROM todos WHERE id =$1`, [id]);
    return result
}

export const todosServices = {
    createTodo,
    getTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo
}