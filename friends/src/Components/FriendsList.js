import React from 'react'

export default function FriendsList (props) {
    
    const { friendsData, deleteFriend } = props;
    const deleteThisFriend = (event) => {
        const friendId = event.target.id;
        deleteFriend(friendId);
    }
    return (
        <>
            {
            friendsData.map(friend =>(
                <div className="friend-box" key={friend.id}>
                <div className="delete" onClick={deleteThisFriend} id={friend.id}>x</div>
                <div className="friend-header">{friend.name} <span onClick="">| Edit</span></div>
                <div className="line-wrapper"><label>Age :</label> <div>{friend.age}</div></div>
                <div className="line-wrapper"><label>email :</label> <div>{friend.email}</div></div>        
                </div>
            ))
            }
        </>
    );
}