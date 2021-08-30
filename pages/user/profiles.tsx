import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import ProfileCard from '../../components/user/profileCard';
import { getAuthenticatedUser, getProfiles } from '../../services/userService';
export default function Profiles () {
    const [profiles, setProfiles] = useState([]);
    let data = getAuthenticatedUser();

    useEffect(() => {

        async function getData() {
            let data = await getProfiles()
            setProfiles(data);
        }
        getData();
    },[]);

    return (
        <>
            <Layout home>                
                <div className="min-h-screen flex justify-items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                        <div className="text-center  font-extrabold text-gray-900">Wellcome {data.user.username}</div>
                        <div className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Profiles</div>
                        <ul>
                        {   
                            profiles.map(( {id, username, liked}) => (
                                    <div key={id}>
                                        <ProfileCard id={id} username={username} liked={liked}/>
                                    </div>
                                )
                            )   
                        }
                        {
                            profiles.length == 0 && <div>No profiles. Please logout and create another user</div>
                        }
                        </ul>
                </div>
                </div>
            </Layout>
        </>
    )
    
}