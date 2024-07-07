import React, { useEffect, useState } from 'react'

function DropdownProfile(props) {

    console.log(props.displayValue);

    const [profile, setProfile] = useState({name: 'name'});


    useEffect(() => {

        const fetchProfileData = async () => {

            try {

                const response = await fetch(`http://localhost:3000/user/admin@notesshare.com`);
                const data = await response.json();
                console.log(data);
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
            <img className='dropdown-profile-image'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s'/>
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