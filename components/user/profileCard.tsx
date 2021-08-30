import router from 'next/router';
import { useState } from 'react';

import { likeUser, unlikeUser } from '../../services/userService';

export default function ProfileCard({id, username, liked}) {
    liked = !liked;
    const likeButtonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold';
    const unLikeButtonClass = 'bg-transparent hover:bg-red-300 text-red border border-red-500 hover:border-transparent';
    

    const [state, setState] = useState({
        likedBool: liked,
        buttonTitle: liked ? 'Like': 'Unlike',
        buttonClass: liked ? likeButtonClass : unLikeButtonClass
    })

    let likeUserClick =  async (id) => {
        try {
            let method = state.likedBool ? likeUser(id) : unlikeUser(id);
            await method;
            const newValue = !state.likedBool;

            setState({
                likedBool: newValue,
                buttonTitle: newValue ? 'Like': "UnLike",
                buttonClass: newValue ? likeButtonClass: unLikeButtonClass
            })

        } catch (e){
            alert(e);
        }
    }

    let clickUsername = async (id) => {
        router.push(`/user/${id}`)
    }
 

    return (
        <>
            <div className={`flex flex-row justify-between justify-items-center border-t-2 p-1`}>
                <div className={'font-sans'}>
                    <h3 className="text-gray-900"> id: {id} </h3> 
                    <h3 className="text-pink-900"> Username: <b onClick={() => clickUsername(id)} className="hover:text-pink-600 cursor-pointer">{username}</b></h3>
                </div>
                <div className="flex flex-col ">
                    <div onClick={() => likeUserClick(id)} className={
                        `btn w-20 h-9 cursor-pointer ${state.buttonClass} py-2 px-4 rounded text-sm text-center`}>
                        {state.buttonTitle}
                    </div>
                    <div onClick={() => clickUsername(id)}className="text-center text-blue-600 hover:text-blue-900 cursor-pointer mt-2 text-sm">
                        View
                    </div>
                </div>
                
            </div>
        </>
    )

   
}