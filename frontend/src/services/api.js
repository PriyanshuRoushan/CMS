const BASE_URL = "http://localhost:8000/api";

export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/login/auth`,{
        method: "POST",
        headers: {"Content Type": "application/json"},
        body: JSON.stringify(data),
    });
    return res.json();
}