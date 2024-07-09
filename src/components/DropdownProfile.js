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
        <div className='dropdown-profile' style={{display: props.displayValue}}>
            <img className='dropdown-profile-image' src= {userProfileLogo}/>
            <p>{profile.name}</p>
            <hr/>
            <ul>
                <li>Edit Profile</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default DropdownProfile;