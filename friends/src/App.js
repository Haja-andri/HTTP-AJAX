import React from 'react';
import FriendsList from './Components/FriendsList'
import './App.css';

export default class App extends React.Component {

  state = {
    friendsData: null,
    errorMessage: '',
    newFriendName: '',
    newFriendAge: '',
    newFriendEmail: '',
  }

  fetchFriendsData = () => {
    fetch('http://localhost:5000/friends')
  .then(response =>{
    return response.json();
  })
  .then(friends => {
    this.setState({
      friendsData: friends,
    });
  })
  .catch(error => {
    this.setState({
      errorMessage: error.message,
    })
  })

  }

  componentDidMount (){
    this.fetchFriendsData();
  }

  deleteFriend = (friendId) => {
    const newFriendsData = this.state.friendsData.filter( friend => (
      friend.id !== Number(friendId)
    ));
    this.setState({
      // Probably have to post here
      friendsData: newFriendsData,
    })
  }

  // addFriend = () => {
  //   console.log('adding friend')
  // }

  inputHandler = (event) => {
    if(event.target.name === 'name') this.setState({ newFriendName: event.target.value });
    else if (event.target.name === 'age') this.setState({ newFriendAge: event.target.value });
    else if (event.target.name === 'email') this.setState({ newFriendEmail: event.target.value });
  }

  addNewFriend = () => {
    const newFriend = {
      id: this.state.friendsData.length + 1,
      name: this.state.newFriendName,
      age: this.state.newFriendAge,
      email: this.state.newFriendEmail,
    };
    
    this.state.friendsData.push(newFriend);

    this.setState({
      friendsData: this.state.friendsData,
      // Probably have to post here
    })

  }

  render () {
    return (
      <>
      <div className="form-countainer">
        <div className="inputs-section">
          <label>Name</label> 
          <input value ={this.state.name} onChange = {this.inputHandler} name="name" type='text'></input>
          <label>Age</label> 
          <input value ={this.state.age} onChange = {this.inputHandler} name="age" type='text'></input>
          <label>Email</label> 
          <input value ={this.state.email} onChange = {this.inputHandler} name="email" type='text'></input>
        </div>
        <div className="button-section">
          <button onClick={this.addNewFriend} >Add Friends</button>
        </div>
      </div>
      <div className="friends-container">
        { /* equivalent to "if there is an errorMessage, display the following" */
          !!this.state.errorMessage && (
            <div>{this.state.errorMessage}</div>
          )
        }
        {
          !!this.state.friendsData && <FriendsList friendsData={this.state.friendsData} deleteFriend={this.deleteFriend} />
        }
      </div>
      </>
    );
  }
}
