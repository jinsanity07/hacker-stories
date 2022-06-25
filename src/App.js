import logo from './logo.svg';
import './App.css';
import React from 'react';

const welcome = { greeting: 'Hey', title: 'React!', };
const getTitle = (title) =>  { return title; }

const list = [ 
  { title: 'React',
    url: 'https://reactjs.org/', 
    author: 'Jordan Walke', num_comments: 3, 
    points: 4, objectID: 0, }, 
    { title: 'Redux', url: 'https://redux.js.org/', 
    author: 'Dan Abramov, Andrew Clark', num_comments: 2, 
    points: 5, objectID: 1, }, ];

const App = () =>{
  const stories = [ { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4, objectID: 0, }, { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, }, ];
  console.log('App renders');
  
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => { setSearchTerm(event.target.value); };

  const searchedStories = stories.filter(function (story) { 
      return story.title.includes(searchTerm); 
    });
  
  return ( <div> 
  
            <h1> {welcome.greeting} {welcome.title} </h1>
            <h1>Hello {getTitle('React')}</h1>

            <Search onSearch={handleSearch} />

            
             <hr />
             <List list={searchedStories} />
              </div> );

}

const List = (props) => {
  console.log('List renders');
  return ( <ul> 
      {props.list.map((item) => (
      <Item key={item.objectID} item={item} />

      ))}
          </ul> );
  
  };

  const Item = (props) => ( 
      <li> 
        <span> 
          <a href={props.item.url}>{props.item.title}</a> 
        </span> 
        <span>{props.item.author}</span> 
        <span>{props.item.num_comments}</span> 
        <span>{props.item.points}</span> 
      </li> 
      );

const Search = (props) => ( <div>

  <label htmlFor="search">Search: </label>
  
  <input id="search" type="text" onChange={props.onSearch} />
  
  </div> );

//   const Search = (props) => {
//     // let searchTerm = '';
//     const [searchTerm, setSearchTerm] = React.useState('');

//     const handleChange = (event) => { 
//       // console.log(event);
//       console.log(event.target.value); 
//       // a function to update this state
//       setSearchTerm(event.target.value);
//       // B 
//       props.onSearch(event);
//     };

//     return ( 
//     <div>

//       <label htmlFor="search">Search: </label>      
//       <input id="search" type="text" onChange={handleChange}/>
//       <p> Searching for <strong>{searchTerm}</strong>.</p>

//     </div> );

// }
export default App;
