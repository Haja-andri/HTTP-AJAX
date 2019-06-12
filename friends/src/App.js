import React from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           HTTP / AJAX Project here
//         </p>
//       </header>
//     </div>
//   );
// }

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
      <div className="App-header">
        { /* equivalent to "if there is an errorMessage, display the following" */
          !!this.state.errorMessage && (
            <div>{this.state.errorMessage}</div>
          )
        }
        {
          !!this.state.friendsData && (
            <>
            <label>Name :</label> <div>Jean</div>
            <label>Age :</label> <div>39</div>
            <label>email :</label> <div>jean@gmail.com</div>
            </>
          )
        }
      </div>
    );
  }
}
