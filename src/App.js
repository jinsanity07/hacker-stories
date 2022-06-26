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
  
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
    );
    
    React.useEffect(() => { 
      localStorage.setItem('search', searchTerm); 
    }, [searchTerm]);

    const handleSearch = (event) => { 
      setSearchTerm(event.target.value); 
    };

  // const handleSearch = (event) => { 
  //       setSearchTerm(event.target.value); 
  //       localStorage.setItem('search', event.target.value);
  //     };

  const searchedStories = stories.filter((story) => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) );
      
    return ( <div> 
  
            <h1> {welcome.greeting} {welcome.title} </h1>
            <h1>Hello {getTitle('React')}</h1>

            <Search search={searchTerm} onSearch={handleSearch} />

            
             <hr />
             <List list={searchedStories} />
              </div> );

}
const List = ({ list }) => ( 
  <ul>
  {list.map((item) => ( 
                      <Item key={item.objectID} item={item} />
                      ))} 
                      
  </ul> );
  
  const Item = ({ item }) => (
             <li> 
               <span> <a href={item.url}>{item.title}</a> </span> 
               <span>{item.author}</span> 
               <span>{item.num_comments}</span> 
               <span>{item.points}</span> 
              </li> );

      // conveniently access all information without dealing with its props container.
const Search = ({ search, onSearch }) => {
  // with object destructuring
  // const { search, onSearch } = props;
  
  return( 
    <div>
      <label htmlFor="search">Search: </label>
      
      <input id="search" 
            type="text"
            value={search}
            onChange={onSearch} />
    
    </div> )};

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
