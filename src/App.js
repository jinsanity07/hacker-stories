import logo from './logo.svg';
import './App.css';
import React from 'react';

const welcome = { greeting: 'Hey', title: 'React!', };
const getTitle = (title) =>  { return title; }

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () =>{
  // const stories = [ { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4, objectID: 0, }, { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, }, ];
  console.log('App renders');

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

      
    return ( 
      <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>

      </InputWithLabel>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
    );
}


const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  // A First, create a ref with React’s useRef Hook. This ref object is a persistent value which stays intact over the lifetime of a React component. It comes with a property called current, which, in contrast to the ref object, can be changed.
  const inputRef = React.useRef();
  // C Third, opt into React’s lifecycle with React’s useEffect Hook, performing the focus on the input field when the component renders (or its dependencies change).
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      // D And fourth, since the ref is passed to the input field’s ref attribute, its current property gives access to the element. Execute its focus programmatically as a side-effect, but only if isFocused is set and the current property is existent.
      inputRef.current.focus();
    }
  }, [isFocused]);
  return(
  
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    {/* B Second, the ref is passed to the input field’s JSX-reserved ref attribute and the element instance is assigned to the changeable current property.*/ }
    <input
      ref={inputRef}
      id={id}
      type={type}
      value={value}
      // autoFocus={isFocused}
      onChange={onInputChange}
    />
  </>
);
};

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
// const Search = ({ search, onSearch }) => {
//   // with object destructuring
//   // const { search, onSearch } = props;
  
//   return( 

//     <>
//       <label htmlFor="search">Search: </label>
      
//       <input id="search" 
//             type="text"
//             value={search}
//             onChange={onSearch} />
    
//     </> )};

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
