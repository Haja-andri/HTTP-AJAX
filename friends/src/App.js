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
    friendsData: [],
    errorMessage: ''
  }

  fetchFriendsData = () => {
    fetch('http://localhost:5000/friens')
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
      <div className="App-header">Something here</div>
    );
  }
}
