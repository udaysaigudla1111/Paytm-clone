import { atom } from "recoil";

const amountAtom = atom({
    default:"",
    key:"amount"
})

const balanceAtom = atom({
    key:"balance",
    default:0
})

export {amountAtom,balanceAtom}