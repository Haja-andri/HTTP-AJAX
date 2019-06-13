import React from 'react';
import axios from 'axios';
import FriendsList from './Components/FriendsList';
import './App.css';

const friendsApi = 'http://localhost:5000/friends';

export default class App extends React.Component {

  state = {
    friendsData: null,
    errorMessage: '',
    newFriendName: '',
    newFriendAge: '',
    newFriendEmail: '',
  }

  fetchFriendsData = () => {
    fetch(friendsApi)
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
    // const newFriendsData = this.state.friendsData.filter( friend => (
    //   friend.id !== Number(friendId)
    // ));
    // this.setState({
    //   // Probably have to post here
    //   friendsData: newFriendsData,
    // })
    axios.delete(`${friendsApi}/${friendId}`)
    .then((res) => {
      this.setState({
        friendsData: res.data,
      })
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
      // id: this.state.friendsData.length + 1,
      name: this.state.newFriendName,
      age: this.state.newFriendAge,
      email: this.state.newFriendEmail,
    };
    
    axios.post(friendsApi, newFriend)
    .then(res => {
      this.setState({
        friendsData: res.data,
        newFriendName: '',
        newFriendAge: '',
        newFriendEmail: '',
      })
    })
    // 
  }

  render () {
    return (
      <>
      <div className="form-countainer">
        <div className="inputs-section">
          <label>Name</label> 
          <input onChange = {this.inputHandler} name="name" type='text'></input>
          <label>Age</label> 
          <input onChange = {this.inputHandler} name="age" type='text'></input>
          <label>Email</label> 
          <input onChange = {this.inputHandler} name="email" type='text'></input>
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
