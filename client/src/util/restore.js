export const loadUserState = () => {
    const u = localStorage.getItem("user");
    if(u){
        return JSON.parse(u);
    }else{
        return {};
    }
}

export const saveState = (u) => {
    u.loggedIn = true;
    localStorage.setItem("user", JSON.stringify(u));
}

export const deleteState = () => {
    localStorage.removeItem("user");
}