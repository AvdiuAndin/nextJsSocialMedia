import config from '../config/contants.json'

const socketUrl = config.SERVER_URL;

import { io } from 'socket.io-client';
import { getAuthenticatedUser } from './userService';


let socketConnection = null;

export function setupSocket(){
    if(socketConnection != null) return;

    let user = getAuthenticatedUser();

    socketConnection = io(socketUrl, {
        auth: {
            username: user.username,
            token: user.jwt
        }
    });

    socketConnection.on("data", (data)=>{
        alert(data.message);
    })
}


export function disconnect() {
    if(socketConnection != null){
        socketConnection.disconnect();
    }
}