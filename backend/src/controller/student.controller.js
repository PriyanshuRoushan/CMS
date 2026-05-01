import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";

export const createStudent = async(req,res) =>{
    try{
        const {
            email,
            password,
            name,
            phone,
            parent_name,
            parent_phone,
            address,
            state,
            admission_year,
            current_class,
            section_id,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const {data: user, error: userError } = await supabase
        .from("users")
        .insert([
            {
                email,
                password: hashedPassword,
                role: "student",
        },
        ])
        .select()
        .single();

        if(userError)   return res.status(404).json({error: userError.message});

        const {data: student, error: studentError} = await supabase
        .from("student")
        .insert([
        {
            user_id: user.id,
            name,
            phone,
            parent_name,
            parent_phone,
            address,
            state,
            admission_year,
            current_class,
            section_id
        }
        ])
        .select()
        .single();

        if(studentError){
            await supabase.from("users").delete().eq("id", user.id);

            return req.status(400).json({error: studentError.error});
        }
        res.status(201).json({
            msg: "Student created Successfully",
            user,
            student,
        });
    }catch(error){
        res.status(500).json({msg: "Server error", error: error.message});
    }
};