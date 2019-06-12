import React from 'react';
import FriendsList from './Components/FriendsList'
import './App.css';

export default class App extends React.Component {

  state = {
    friendsData: null,
    errorMessage: ''
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

  render () {
    return (
      <>
      <div className="form-countainer">
        <div className="inputs-section">
          <label>Name</label> <input type="text" />
          <label>Age</label> <input type="text" />
          <label>Email</label> <input type="text" />
        </div>
        <div className="button-section">
          <button>Add Friends</button>
        </div>
      </div>
      <div className="friends-container">
        { /* equivalent to "if there is an errorMessage, display the following" */
          !!this.state.errorMessage && (
            <div>{this.state.errorMessage}</div>
          )
        }
        {
          !!this.state.friendsData && <FriendsList friendsData={this.state.friendsData} />
        }
      </div>
      </>
    );
  }
}
