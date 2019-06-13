import React from 'react';
import axios from 'axios';
import FriendsList from './Components/FriendsList';
import './App.css';

const friendsApi = 'http://localhost:5000/friends';

export default class App extends React.Component {

  state = {
    friendsData: null,
    currentMode: 'Add',
    currentFriendId: null,
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
    const currentFriend = {
      // id: this.state.friendsData.length + 1,
      name: this.state.newFriendName,
      age: this.state.newFriendAge,
      email: this.state.newFriendEmail,
    };

    if(this.state.currentMode === 'Add') {
      axios.post(friendsApi, currentFriend)
      .then(res => {
        this.setState({
          friendsData: res.data,
        })
      })
    }
    else if (this.state.currentMode === 'Update') {
      axios.put(`${friendsApi}/${this.state.currentFriendId}`, currentFriend)
      .then((res) =>{
        this.setState({
          friendsData: res.data,
        })        
      })
    } 
    // big cleaning
    this.setState({
      currentFriendId: null,
      currentMode: 'Add',
      newFriendName: '',
      newFriendAge: '',
      newFriendEmail: '',
    })  

  }

  editFriend = (friendId) => {
    // load selected friend data 
    const currentFriendId = Number(friendId);
    let editedFriendData = this.state.friendsData.find((friend) => {
      return friend.id === currentFriendId;
    })

    // console.table(editedFriendData);
    // Load on form fields
    this.setState({
      currentMode: 'Update',
      currentFriendId: currentFriendId,
      newFriendName: editedFriendData.name,
      newFriendAge: editedFriendData.age,
      newFriendEmail: editedFriendData.email,
    })
  }

  render () {
    return (
      <>
      <div className="form-countainer">
        <div className="inputs-section">
          <label>Name</label> 
          <input value={this.state.newFriendName} onChange = {this.inputHandler} name="name" type='text'></input>
          <label>Age</label> 
          <input value={this.state.newFriendAge} onChange = {this.inputHandler} name="age" type='text'></input>
          <label>Email</label> 
          <input value={this.state.newFriendEmail} onChange = {this.inputHandler} name="email" type='text'></input>
        </div>
        <div className="button-section">
          <button onClick={this.addNewFriend} >{this.state.currentMode} Friends</button>
        </div>
      </div>
      <div className="friends-container">
        { /* equivalent to "if there is an errorMessage, display the following" */
          !!this.state.errorMessage && (
            <div>{this.state.errorMessage}</div>
          )
        }
        {
          !!this.state.friendsData && <FriendsList friendsData={this.state.friendsData} deleteFriend={this.deleteFriend} editFriend={this.editFriend} />
        }
      </div>
      </>
    );
  }
}
