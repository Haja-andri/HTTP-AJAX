import React from 'react'

export default function FriendsList (props) {
    const receivedFriendsData = props.friendsData
    return (
        <>
            {
            receivedFriendsData.map(friend =>(
                <div className="friend-box" key={friend.id}>
                <div className="friend-header">{friend.name} <span>Delete</span></div>
                <div className="line-wrapper"><label>Age :</label> <div>{friend.age}</div></div>
                <div className="line-wrapper"><label>email :</label> <div>{friend.email}</div></div>        
                </div>
            ))
            }
        </>
    );
}