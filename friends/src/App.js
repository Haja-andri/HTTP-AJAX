import React from 'react';
import axios from 'axios';
import FriendsList from './Components/FriendsList';
import './App.css';
import InputForm from './Components/Form/Form';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
    axios.delete(`${friendsApi}/${friendId}`)
    .then((res) => {
      this.setState({
        friendsData: res.data,
      })
    })
  }

  inputHandler = (event) => {
    if(event.target.name === 'name') this.setState({ newFriendName: event.target.value });
    else if (event.target.name === 'age') this.setState({ newFriendAge: event.target.value });
    else if (event.target.name === 'email') this.setState({ newFriendEmail: event.target.value });
  }

  addNewFriend = () => {
    if(this.state.newFriendName !== '' && this.state.newFriendAge !== '' && this.state.newFriendEmail !== '') {
      const currentFriend = {
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
  }

  editFriend = (friendId) => {
    // load selected friend data 
    const currentFriendId = Number(friendId);
    let editedFriendData = this.state.friendsData.find((friend) => {
      return friend.id === currentFriendId;
    })

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
      <Router>
      <>
        <Route 
          path="/"
          render= {props => (
            <InputForm 
              newFriendName={this.state.newFriendName}
              newFriendAge={this.state.newFriendAge}
              newFriendEmail={this.state.newFriendEmail}
              inputHandler={this.inputHandler}
              addNewFriend={this.addNewFriend}
              currentMode={this.state.currentMode}
            />
          )}
        />

        <div className="friends-container">
          { /* equivalent to "if there is an errorMessage, display the following" */
            !!this.state.errorMessage && (
              <div>{this.state.errorMessage}</div>
            )
          }
          {
            !!this.state.friendsData && 
            <Route 
            path="/"
            render={props =>(
              <FriendsList 
                friendsData={this.state.friendsData} 
                deleteFriend={this.deleteFriend} 
                editFriend={this.editFriend} 
              />
            )}
            />
          }
        </div>
      </>
      </Router>
    );
  }
}
