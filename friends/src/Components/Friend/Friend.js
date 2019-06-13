import React from 'react'

export default function Friend (props) {
    const {id, deleteThisFriend, name, editThisFriend, age, email  } = props;
    return(
        <div className="friend-box" key={id}>
        <div className="delete" onClick={deleteThisFriend} id={id}>x</div>
        <div className="friend-header">{name} 
        <span id={id} onClick={editThisFriend}> | Edit</span>
        </div>
        <div className="line-wrapper"><label>Age :</label> <div>{age}</div></div>
        <div className="line-wrapper"><label>email :</label> <div>{email}</div></div>        
        </div>
    );
}