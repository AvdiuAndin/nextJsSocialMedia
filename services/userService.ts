import router from "next/router";
import { disconnect as socketDisconnect } from "./notificationService";
import { post, get, del } from "./httpService";
const LS = process.browser ? localStorage: null;


// Local storage functions
export function isUserAuthenticated() : Boolean {
    return LS.getItem("user") != null;
}

export function setUser(user){
    LS.setItem("user", JSON.stringify(user));
}

export function getAuthenticatedUser() {
    return JSON.parse(LS.getItem("user"));
}

export function getJwt(): string {
    let user = JSON.parse(LS.getItem("user"));
    return user.jwt;
}


// Api CALLS
export function getProfiles(){
    return get(`/user/profiles`);
}


export function getProfileOfUserById(id){
    return get(`/user/${id}/profile`);
}

export function login(identifier: string, password: string) {
    return post('/auth/local',{
        identifier,
        password
    }); // api call to signup
}

export function register(email: string, password: string) {
    let username = email.split('@')[0];
    return post('/auth/local/register',{
        username,
        email,
        password
    });
}
export async function likeUser(id) {
    return post(`/user/${id}/like`,{});
}

export async function unlikeUser(id) {
    return del(`/user/${id}/unlike`,{});
}

export function logout(){
    LS.removeItem("user");
    socketDisconnect();
    router.push('/');
}
