const IPFS = require("nano-ipfs-store");
const ipfs = IPFS.at("https://ipfs.infura.io:5001");
// import assert from 'assert';

const SUPERADMIN = "bafkreigufadcaqcwyhe2nkxkxltue5zxgsghuiqzacoblzums4cvncicku";
const MANUFADMIN = "bafkreie4yu47hym5f74ubh5tomvy43m6jrzn5blhryzaogt2q4iuggg7z4";
const HEALTHCADMIN = "bafkreie5anvaffpilzl2rvw7fimmrnsgpt6u2pdyklofw3q7x6dfdizo4q"
const DISTRADMIN = "bafkreib4sdwwv54rjxipcmd43e4aiowiiqibuxytqz7a6oelhssn2efwfe";

var roleName = "";

export default async function fetchRole() {
    if (role === await ipfs.cat(SUPERADMIN)){
        // setRoleName("superAdmin");
        roleName = "superAdmin";
    }else if (role === await ipfs.cat(MANUFADMIN)){
        roleName = "Manufacturer"
    }else if (role === await ipfs.cat(DISTRADMIN)){
        roleName = "Distributor"
    }else if (role === await ipfs.cat(HEALTHCADMIN)){
        roleName = "Health Care Center"
    }
    else {
        console.log("not found");
    }
    
    localStorage.setItem("roleName",roleName);
}