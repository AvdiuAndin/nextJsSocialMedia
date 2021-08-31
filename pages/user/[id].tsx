import router from "next/router"
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { getProfileOfUserById } from "../../services/userService";

export default function Profile() {
    
    const { id } = router.query;
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getData() {
            let user = await getProfileOfUserById(id);
            setUser(user);
        }
        getData();
    },[]);

    return (
        <>
            <Layout>
                <div className="min-h-screen flex justify-items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Profile of {user.email}</div>
                        <div className="mt-6 text-center">
                            <div>{user.username} profile has been liked by {user.numberOfLikes} users</div>
                            <div>and has liked {user.numberOfLikedUsers} number of users</div>
                        </div>
                    </div>
                    
                </div>  
            </Layout>
        </>
            
    )
}