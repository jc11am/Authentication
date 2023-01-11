import { toast } from "react-hot-toast"


//Username input validate
export async function validatedError (values){
    const error = validateError({}, values)

    return error
}

//Password validate function
export async function passwordValidated(values){
    const errors = passwordValidate({}, values)

    return errors
}

//Reset password
export async function resetPasswordValidated(values){
    const errors = passwordValidate({}, values)

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password does not match")
    }
    return errors
}

//export email verification
export async function registerValidation(values){
    const errors = validateError({}, values);
    passwordValidate(errors, values);
    emailVerify(errors, values);

    return errors;
}

//export profile validate
export async function profileVerify(values){
    const errors = emailVerify({}, values)

    return errors
}

//Username input validate
const validateError = function(errors = {}, values){
    if(!values.username){
        errors.username = toast.error("Please Fill the required filed")
        
    }else if(values.username.includes(" ")){
        errors.username = toast.error("Invalid Input")
    }

    return errors
}

//Password validate
const passwordValidate = function(errors = {}, values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("This field is required")
    }
    else if(values.password.includes(" ")){
        errors.password = toast.error("Add a valide password")
    }
    else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters")
    }
    else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors
}

//validate email
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}