import { atom } from "recoil";

const usernameState = atom({
    key:"username",
    default:""
})

const passwordState = atom({
    key:"password",
    default:"",
})

const firstNameState = atom({
    key:"firstName",
    default:""
})

const lastNameState = atom({
    key:"lastName",
    default:""
})


export {usernameState,lastNameState,firstNameState,passwordState}