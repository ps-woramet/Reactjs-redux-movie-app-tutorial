import React, {useState, useEffect} from 'react'
import './MovieDetail.scss'
import MovieApi from '../../api/MovieApi'
import { APIKey } from '../../api/MovieApiKey'
import {useParams} from 'react-router-dom'

function MovieDetail() {

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    console.log(id)
    console.log(APIKey)

    useEffect(()=>{
        const fetchDetail = async()=>{
            const res = await MovieApi.get(`?apikey=${APIKey}&i=${id}&plot=full`)
                        .catch((error)=>{console.error('error', error)})
        
            setMovie(res.data)
            setLoading(true)
        }
        fetchDetail();
    }, [])

    return (
        <div>
            {loading ? 
            <div className="movie-detail-con">
                <div className="movie-detail-img">
                    <img src={movie.Poster} alt={movie.Title} />
                </div>
                <div className="movie-detail-info">
                    <h3>{movie.Title}</h3>
                    <p style={{margin: '2rem 0'}}>{movie.Plot}</p>
                </div>
                <div>
                    <strong>Released : {movie.Released}</strong>
                </div>
            </div>
            :
                <div>
                    <h4 style={{margin: '1rem 0'}}>Loading...</h4>
                </div>
            }
        </div>
  )
}

export default MovieDetail
