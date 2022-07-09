import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

const welcome = { greeting: 'Hey', title: 'React!', };
const getTitle = (title) =>  { return title; }
// First, the API_ENDPOINT (A) is used to fetch popular tech stories for a certain query (a search term). In this case, we fetch stories about React 
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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

// const getAsyncStories = () => new Promise((resolve, reject) => setTimeout(reject, 2000));
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  );

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};
const App = () =>{
  // const stories = [ { title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4, objectID: 0, }, { title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1, }, ];
  console.log('App renders');

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );


  // A  For the sake of learning, we will move all the data fetching logic into a standalone function outside the side-effect (A)
  const handleFetchStories = React.useCallback( async () => { // B wrap it into a useCallback hook (B),
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
    const result = await axios.get(url);

        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,  // (D), which we send as payload to our component’s state reducer.
        });
      } catch {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
      }

  }, [url]); // E This hook creates a memoized function every time its dependency array (E) changes.

  React.useEffect(() => {
    handleFetchStories(); // C then invoke it in the useEffect hook (C):
  }, [handleFetchStories]); // D As a result, the useEffect hook runs again (C) because it depends on the new function (D):

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };


      
    return ( 
      <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>

      </InputWithLabel>

      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? ( <p>Loading ...</p> ) : (
                    <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}

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

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}  //passes callback handler on to the Item component:
      />
    ))}
  </ul>
);
  
  const Item = ({ item , onRemoveItem }) => {

    return (
    
             <li> 
               <span> <a href={item.url}>{item.title}</a> </span> 
               <span>{item.author}</span> 
               <span>{item.num_comments}</span> 
               <span>{item.points}</span> 
               <span>
               <button type="button" onClick={ () => { 
                 // do something else   using 3=> a block body
               // note: avoid using complex logic in JSX
              //  1=> JavaScript’s bind method:  onRemoveItem.bind(null, item)
              //  2=> wrapping arrow function
               onRemoveItem(item)} }>   {/*   */}
                  Dismiss
                </button>
              </span>
              </li> );}

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
