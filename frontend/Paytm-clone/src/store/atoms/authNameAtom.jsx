import { atom } from "recoil";

export const authAtom = atom({
    default:false,
    key:"auth"
})

export const nameAtom = atom({
    default:"",
    key:"Name"
})