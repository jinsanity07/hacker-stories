import logo from './logo.svg';
import './App.css';

const welcome = { greeting: 'Hey', title: 'React!', };
function getTitle(title) { return title; }

const list = [ 
  { title: 'React',
    url: 'https://reactjs.org/', 
    author: 'Jordan Walke', num_comments: 3, 
    points: 4, objectID: 0, }, 
    { title: 'Redux', url: 'https://redux.js.org/', 
    author: 'Dan Abramov, Andrew Clark', num_comments: 2, 
    points: 5, objectID: 1, }, ];

function App() {

  return ( <div> 
  
            <h1> {welcome.greeting} {welcome.title} </h1>
            <h1>Hello {getTitle('React')}</h1>
            <label htmlFor="search">Search: </label>

            <input id="search" type="text" />

            <ul> {list.map(function (item) 
                  { return (
                    <li key={item.objectID}>
                    <span>
                      <a href={item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                  </li>
                    ); 
                  
                    })}       
            </ul>

            <Search />

            <hr />
             <List />
             <hr />
             <List />
            <Search/>
              </div> );

}

function List() {

  return ( <ul> {list.map(function (item) { return ( <li key={item.objectID}> <span> <a href={item.url}>{item.title}</a> </span> <span>{item.author}</span> <span>{item.num_comments}</span> <span>{item.points}</span>
          
          </li>
          
          );
          
          })}
          
          </ul> );
  
  }

  function Search() { return ( <div>

    <label htmlFor="search">Search: </label>
    
    <input id="search" type="text" />
    </div> );

}
export default App;
