import React, { useEffect, useState } from 'react'
import { userProfileLogo } from '../utils/constants';

function DropdownProfile(props) {

    const [profile, setProfile] = useState({name: 'name'});

    useEffect(() => {
        const fetchProfileData = async () => {

            try {
                const response = await fetch(`http://localhost:3000/user/admin@notesshare.com`);
                const data = await response.json();
                setProfile( { 'name': data.userName})
            }
            catch(err) {
                console.log("cannot fetch profile data: ", err);
            }
        }

        fetchProfileData()
    }, []);

    return (
        <div className='flex-col items-center fixed top-20 right-10 bg-pink-300' style={{display: props.displayValue}}>
            <img className='w-16 rounded-full pt-2' src= {userProfileLogo}/>
            <p>{profile.name}</p>
            <hr/>
            <ul className='flex-col p-3'>
            <li>Edit Profile</li>
            <li className='border-t-2 border-stone-800'>Logout</li>
            </ul>
        </div>
    )
}

export default DropdownProfile;