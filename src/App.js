import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [movies, setMovies] = useState([])
  const [inp, setInp] = useState("")

  const handleChange = (event) =>{
    setInp(event.target.value)
  }

  const onSearch = (searchItem) =>{
    setInp(searchItem)
    console.log(searchItem)
  }

  useEffect(() =>{
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6901dc909e96fd4fab1d8a0d8388333b&language=en-US&page=1')
    .then(res => setMovies(res.data.results.slice(1,11)))
    .catch(err => alert(err.message))
  },[])

  return (
    <div className="App">
    
      <div className="search">
        <input
          id="outlined-basic"
          onChange={handleChange}
          value = {inp}
          variant="outlined"
          label="Search"
        />
        <button onClick={() => onSearch(inp)}>Submit</button>
      </div>

      <div>
                { 
                    movies.filter((post) => {
                      console.log(post)
                      const searchItem = inp.toLowerCase()
                      const film = post.title.toLowerCase()

                      return (searchItem && film.startsWith(searchItem) && film !== searchItem);

                    }).slice(0, 10)
                    .map((film,idx)=>(
                        
                        <div key={idx} onClick={() => onSearch(film.title)}>
                            <p>{film.title}</p>
                        </div>
                        
                    ))
                }
            <div className="col-md-12 text-center d-flex">
                {
                  movies.map((film,idx)=>(
                        
                    <div key={idx}>
                        <img className="img-fluid" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} />
                        <p>{film.title}</p>
                    </div>
                    
                ))
                }
              </div>
      </div>
    </div>
  );
}

export default App;
