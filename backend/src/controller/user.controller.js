import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";

// Create Users (Admin only).  
//----------- Pending to create this Feature--------------
export const createUsers = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // validation
        if (!email || !password || !role) {
            return res.status(400).json({ msg: "All fields required" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        const { data, error } = await supabase
            .from("users")
            .insert([{
                email,
                password: hashedPassword,
                role
            }])
            .select()
            .single();

        if (error) throw error;

        return res.status(201).json({
            msg: "User created successfully",
            user: {
                id: data.id,
                email: data.email,
                role: data.role
            }
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Error creating user",
            error: err.message
        });
    }
};

// Get all users (Admin only)
export const getUsers = async (req, res) =>{
    try{
        const {data, error} = await supabase
        .from("users")
        .select("id","email","role")

        if(error) throw error;
        res.json(data);

    }catch(err){
        return res.status(500).json({msg: "Error fethcing Users"});
    }
};

// Get logged in users 
export const getLoggedInUsers = async (req, res) =>{
    try{
        const {data, error} = await supabase
        .from("users")
        .select("id, email, role")
        .eq("id", req.user.id)
        .single();

    if(error) throw error;
    
    res.json(data);
    }catch(err){
        return res.status(500).json({msg: "Error fetching User Data"});
    }
};

// Update user (self || admin)  // User name not User ID
//----------- Pending to create this Feature--------------
export const updateUser = async (req, res) => {
    try{
        
    }catch(err){
        return res.status(500).json({msg: "error updating user"});
    }
};

// Acitvat/ Deacticvate user (Admin only)
//----------- Pending to create this Feature--------------
export const activateDeactivateUser = async (req, res) =>{
    try{

    }catch(err){
        return res.status(500).json({msg: "Error activating/deactivating user"});
    }
};

// Change Password(self || admin)
//----------- Pending to create this Feature--------------
export const changePassword = async (req, res) =>{
    try{

    }catch(err){
        return res.status(500).json({msg: "error changing password"});
    }
};

// Reset Password (Admin only) 
//----------- Pending to create this Feature--------------
export const resetUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await supabase
            .from("users")
            .update({ password: hashedPassword })
            .eq("id", id);

        res.json({ msg: "Password reset successfully" });

    } catch (err) {
        return res.status(500).json({ msg: "Error resetting password" });
    }
};

//Delete Users (admin only). {soft Delete only}
export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const {error} = await supabase
        .from("users")
        .update({is_deleted: true, updated_at: new Date()})
        .eq("id", id);

        if(error) throw error;
        res.json({msg: "User deleted successfully"});

    }catch(err){
        return res.status(500).json({msg: "Deletion failed"});
    }
};


//----------------------------------------------------
//--------------- ADVANCE COTROLLERS -----------------
//----------------------------------------------------


// Search (Get users)
// ---------------- FUTIRE SCOPE ----------------
export const searchUsers = async (req, res) => {
    try{
        try{
            const {data, error} = await supabase
            .from("users")
            .select("id, email, password")
            .eq()

            if(error)   throw error;
            res.json(data);
        }catch(err){
            return res.status(500).json({msg: "Error Searching the user"});
        }
    }catch(err){
        return res.status(500).json({msg: "Error fethcing Users"});
    }
};

// Paginaiton (Get Users)
// ---------------- FUTIRE SCOPE ----------------
export const handlePagination = async (req, res) => {
    try{

    }catch(err){
        return res.status(500).json({msg: "Error fethcing Users"});
    }
};

//User State (Count)
export const getUserState = async (req, res) =>{
    try{
        
    }catch(err){
        return res.status(500).json({msg: "Error fetching User State"});
    }
};  

// Restore Deleted User
export const restoreUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from("users")
            .update({ is_deleted: false, updated_at: new Date() })
            .eq("id", id);

        if (error) throw error;

        res.json({ msg: "User restored successfully" });

    } catch (err) {
        return res.status(500).json({ msg: "Restoring failed" });
    }
};