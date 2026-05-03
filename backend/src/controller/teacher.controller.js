import supabase from "../config/supabase";
import bcrypt from "bcrypt";

// GET TEACHER PROFILE
export const getTeacherProfile = async(req, res) =>{
    const userId = req.user.id;

    //join user id with teacher table 
    const {data, teacherError} = await supabase
    .from('teachers')
    .selet(`
        `)
}