import React, { useState } from 'react'

function DropdownProfile(props) {
    // const { isOpen } = props;
    console.log(props.displayValue)
  return (
      <div className='dropdown-profile' style={{display: props.displayValue}}>
        <img className='dropdown-profile-image'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s'/>
        <p>name</p>
        <hr/>
        <ul>
            <li>Edit Profile</li>
            <li>Logout</li>
        </ul>
      </div>
  )
}

export default DropdownProfile;