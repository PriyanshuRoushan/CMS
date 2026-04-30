import supabase from "../config/supabase";

export const getAllUsers = async() =>{
    return await supabase.from("users").select("*");
}
export const getUserByEmail = async (email) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
};