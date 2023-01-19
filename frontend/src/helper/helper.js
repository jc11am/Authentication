import axios from "axios"

axios.defaults.baseURL = process.env.SERVER_DOMAIN;

//authenticate functon
const authenticate = async function(username){
    try {
        return await axios.post("/api/authenticate", {username})
    } catch (error) {
        return { error : "Username doesn't exist" }
    }
}

//Get user
const getUser = async function({username}){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return {error: "Paasword does not Match"}
    }
}

//register user
const registerUser = async function (credentials){
    try {
        const { status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 200){
            await axios.post('/api/registerMail', { username, userEmail : email, text : "User Register Successfullly"})
        }

        return Promise.resolve("User Register Successfullly")
    } catch (error) {
        return Promise.reject({ error })
    }
}

//login User
const verifyUser = async function({username, password}){
    try {
        if(username){
            const { data } = await axios.post("/api/login", { username, password })
            return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error : "Promise doesn't Match"})  
    }
}

//update user
const updateUser = async function (response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

//Generate OTP
const generateOTP = async function (username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 200){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

//Verify OTP
const verifyOTP = async function ({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

//Reset Password
const resetPassword = async function ({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

exports = {
    registerUser,
    resetPassword,
    verifyOTP, 
    generateOTP,
    updateUser,
    authenticate,
    getUser,
    verifyUser
}