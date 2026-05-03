import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";


// GET STUDENT PROFILE
export const getStudentProfile = async(req, res) =>{
    try{
        
        const userId = req.user.id;
        
        //join student + users table using id
        const {data, studentError} = await supabase
        .from('students')
        .select(`
            id,
            name,
            phone,
            parent_name,
            parent_phone,
            address,
            state,
            admission_year,
            current_class,

            users(email),
            sections(id, name),
            hostels(id, name)
            `)
        .eq("user_id", userId)
        .single();

        if(studentError) throw studentError;

        return res.status(200).json({
            success: true,
            data,
            message: "Student profile fetched successfully"
        });

    }catch(error){
        return res.status(500).json({
            success: false, 
            message:"Error while fetching student profile",
            error: error.message
        });
    }
};


//-------------------------------------
// ATTENDANCE + MARKS + HOSTEL + LEAVES
//-------------------------------------

// UPDATE STUDENT PROFILE
export const getStudentDashboard = async(req, res) =>{
    try{
        const userID = req.user.id;
        
        // GET STUDENT ID
        const {data: student, error: studentError} = await supabase
        .from('students')
        .select('*')
        .eq("user_id", userID)
        .single();

        if(error) throw error;

        const studentId = student.id;

        // ATTENDANCE %
        const {data: attendance } = await supabase
        .from('attendance')
        .select('status')
        .eq('student_id', studentId);

        const totalAttendance = attendance?.length || 0;
        const present = attendance?.filter(a => a.status === "present")?.length || 0;

        const attendancePercent = totalAttendance >0 ? ((present/totalAttendance) * 100).toFixed(2) : 0;

        // Marks (AVG)
        const {data: marks, error: marksError} = await supabase
        .from('marks')
        .select('score')
        .eq('student_id', studentId)
        
        if(marksError) throw marksError;

        const avgMarks = marks?.length
        ? (marks.reduce((acc, m) => acc + m.score, 0) / marks.length).toFixed(2)
        : 0;

        // // HOSTEL
        // const { data: studentHostel, error } = await supabase
        // .from('students')
        // .select(`
        //     hostel_id,
        //     hostels(
        //         name,
        //         room,
        //         floor,
        //         fee_per_term
        //     )
        // `)
        // .eq('id', studentId)
        // .single();

        // if (error) throw error;

        // const hostel = studentHostel?.hostels || null;
        

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while fetching message",
            error: error.message
        });
    }
}