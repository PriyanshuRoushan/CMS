import supabase from "../config/supabase";

export const getAllStudent = async () => {
    return await supabase.from("student").select("*");
}
export const createStudent = async(student) =>{
    return await supabase.from("student").insert([student]);
}  