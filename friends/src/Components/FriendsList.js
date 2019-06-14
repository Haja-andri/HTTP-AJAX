import React from 'react';
import Friend from './Friend/Friend'

export default function FriendsList (props) {
    
    const { friendsData, deleteFriend, editFriend } = props;
    const deleteThisFriend = (event) => {
        deleteFriend(event.target.id);
    }
    const editThisFriend = (event) => {
        editFriend(event.target.id);
    }

    return (
        <>
            {
            friendsData.map(friend =>(
                <Friend 
                    id={friend.id}
                    deleteThisFriend={deleteThisFriend}
                    name={friend.name}
                    editThisFriend={editThisFriend}
                    age={friend.age}
                    email={friend.email}
                />
            ))
            }
        </>
    );
}