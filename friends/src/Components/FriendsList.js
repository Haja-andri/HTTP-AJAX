import React from 'react'

export default function FriendsList (props) {
    const receivedFriendsData = props.friendsData
    return (
        <>
            {
            receivedFriendsData.map(friend =>(
                <>
                <label>Name :</label> <div>{friend.name}</div>
                <label>Age :</label> <div>{friend.age}</div>
                <label>email :</label> <div>{friend.email}</div>        
                </>
            ))
            }
        </>
    );
}