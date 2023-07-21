import React, {useState, useEffect} from 'react'
import MovieApi from '../../api/MovieApi'
import { APIKey } from '../../api/MovieApiKey'
import { useDispatch } from 'react-redux'
import { addMovie } from '../../store/Reducer'
import './Home.scss'

// components

import MovieListing from '../MovieListing/MovieListing'

function Home() {

    const dispatch = useDispatch();
    const [moviename, setMoviename] = useState('');

    useEffect(() => {
        
        const fetchMovies = async () => {
            const searchKey = moviename ? moviename : 'lego';
            const res = await MovieApi.get(`?apikey=${APIKey}&s=${searchKey}&type=series`)
            if (res.data.Response === "False") {
                console.log("response false");
            } else {
                setTimeout(() => {
                  dispatch(addMovie(res.data.Search));
                }, 500);
            }
        }

        fetchMovies();
    }, [moviename])

  return (
    <div>
        <h3 style={{margin: '1rem 0'}}>movies</h3>
        <input type="text" placeholder='Search...' value={moviename} onChange={(e) => setMoviename(e.target.value)}/>
        <MovieListing/>
    </div>
  )
}

export default Home
