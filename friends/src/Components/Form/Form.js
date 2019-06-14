import React from 'react';

export default function InputForm (props) {
    const { newFriendName, newFriendAge, newFriendEmail, inputHandler, addNewFriend, currentMode} = props;

    return(
        <form onSubmit={addNewFriend}>
        <div className="form-countainer">
            <div className="inputs-section">
            <label>Name</label> 
            <input value={newFriendName} onChange = {inputHandler} name="name" type='text'></input>
            <label>Age</label> 
            <input value={newFriendAge} onChange = {inputHandler} name="age" type='text'></input>
            <label>Email</label> 
            <input value={newFriendEmail} onChange = {inputHandler} name="email" type='text'></input>
            </div>
            <div className="button-section">
            <button type="submit">{currentMode} Friends</button>
            </div>
        </div>
        </form>
    );
} 