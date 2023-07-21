0. npm create vite@latest
    > project name: reactjs-redux-movie-app-tutorial
    > react

    > cd reactjs-redux-movie-app-tutorial
    > npm i
    > npm run dev

1. install dependencies
    npm i @reduxjs/toolkit axios react-redux react-router-dom sass

2. สร้าง folders

    src -> api
    src -> store
    src -> components

3. แก้ไข App.jsx, App.css, ลบโค้ดใน index.css

    -App.jsx

        import './App.css'

        function App() {


        return (
            <div>

            </div>
        )
        }

        export default App
    
    -App.css

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

4. ทำ nav bar สร้าง src -> components -> Header -> Header.jsx

    -Header.jsx

        import React from 'react'
        import './Header.scss'
        import {Link} from 'react-router-dom'

        function Header() {
        return (
            <nav>
                <div className="container">
                    <ul className="nav-wrapper">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        )
        }

        export default Header

    -Header.sass

        nav{
            background-color: black;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            .nav-wrapper {
                display: flex;
                list-style: none;
                li{
                    margin: 0 1rem;
                    a{
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }
    
    -App.jsx โดย <Router> เป็นคอมโพเนนต์หลักที่ใช้ควบคุมการเส้นทางในแอปพลิเคชัน โดยจะรับคำสั่งต่างๆ เพื่อกำหนดเส้นทางและการเรนเดอร์คอมโพเนนต์ที่ต้องแสดงบนหน้าจอ

        import './App.css'
        import Header from './components/Header/Header'
        import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

        function App() {

        return (
            <Router>
                <Header/>
            </Router>
        )
        }

        export default App

    -App.css

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .container{
            max-width: 1140px;
            margin: 0 auto;
            border: solid red 1px;
        }

5. ทำการ ขอเข้าถึง api จาก website (omdb api key)
    จะได้ key ส่งไปที่ email
    Here is your key: 3e613b68

6. สร้างไฟล์สำหรับจัดการ api
    src -> api -> MovieApi.js
    src -> api -> MovieApiKey.js

    -MovieApi.js

        import axios from 'axios'

        export default axios.create({
            baseURL: 'https://www.omdbapi.com/'
        })

    -MovieApiKey.js

        export const APIKey = '3e613b68';

7. สร้าง store และ reducer
    src -> store -> store.js
    src -> store -> reducer.js

    -reducer.js สร้าง reducer movie และ action addmovie, current: เป็นฟังก์ชันที่ใช้ในการอ่านค่า state ปัจจุบันใน Redux store โดยสามารถใช้เพื่อดึงค่า state ในตำแหน่งปัจจุบันก่อนที่จะมีการเปลี่ยนแปลง state ใน reducer ด้วย action ต่างๆ

        import {createSlice, current} from '@reduxjs/toolkit'

        const initialState = {
            movies: []
        }

        const movieSlice = createSlice({
            name: 'movieListing',
            initialState: initialState,
            reducers: {
                addMovie: (state, action) => {
                    state.movies = action.payload
                    console.log(current(state))
                }
            }
        })

        export const {addMovie} = movieSlice.actions
        export default movieSlice.reducer

    -store.js สร้าง store สำหรับจัดการ reducer

        import {configureStore} from '@reduxjs/toolkit'
        import movieSlice from './Reducer'

        export default configureStore({
            reducer: {
                movies: movieSlice
            }
        })

8. import {provider} ที่ App.jsx, import store ที่ App.jsx

    -App.jsx

        import './App.css'
        import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
        import { Provider } from 'react-redux'
        import store from './store/Store'

        // Components

        import Header from './components/Header/Header'

        function App() {

        return (
            <div>
            <Provider store={store}>
                <Router>
                    <Header/>
                </Router>
            </Provider>
            </div>
        )
        }

        export default App

9. สร้าง Home Component เพื่อ fetch ข้อมูล และ ส่ง action จาก dispatch
    src -> Home -> Home.jsx
    src -> Home -> Home.scss

    -Home.jsx ทำการ fetch api จากไฟล์ MovieApi.js

        import React, {useState, useEffect} from 'react'
        import MovieApi from '../../api/MovieApi'
        import { APIKey } from '../../api/MovieApiKey'
        import { useDispatch } from 'react-redux'
        import { addMovie } from '../../store/Reducer'

        function Home() {

            const dispatch = useDispatch();
            const [moviename, setMoviename] = useState('');

            useEffect(() => {
                const fetchMovies = async () => {
                    const searchKey = moviename ? moviename : 'thor';
                    const res = await MovieApi.get(`?apikey=${APIKey}&s=${searchKey}&type=series`)
                    
                    setTimeout(() => {
                        dispatch(addMovie(res.data.Search));
                    }, 500)
                }
                fetchMovies();
            }, [])

        return (
            <div>
                home
            </div>
        )
        }

        export default Home

    -App.jsx

        import './App.css'
        import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
        import { Provider } from 'react-redux'
        import store from './store/Store'

        // Components

        import Header from './components/Header/Header'
        import Home from './components/Home/Home'

        function App() {

        return (
            <div>
            <Provider store={store}>
                <Router>
                <Header/>
                <div className="container">
                    <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    </Routes>
                </div>
                </Router>
            </Provider>
            </div>
        )
        }

        export default App

10. สร้าง movieListing component สำหรับจัด layout และดึงข้อมูลหนัง(idของหนัง, รายละเอียดของหนัง)โดย useSelector จากนั้นส่ง props ไปให้ MovieCard Component, 
    สร้าง MovieCard component แสดงข้อมูลหนังโดยรับค่า props มาจาก MovieListing component และ ทำการ link ไป movie/${movie.imdbID} เมื่อ click button

    -home.jsx ทำการ import MovieListing component

        import React, {useState, useEffect} from 'react'
        import MovieApi from '../../api/MovieApi'
        import { APIKey } from '../../api/MovieApiKey'
        import { useDispatch } from 'react-redux'
        import { addMovie } from '../../store/Reducer'

        // components

        import MovieListing from '../MovieListing/MovieListing'

        function Home() {

            const dispatch = useDispatch();
            const [moviename, setMoviename] = useState('');

            useEffect(() => {
                const fetchMovies = async () => {
                    const searchKey = moviename ? moviename : 'lego';
                    const res = await MovieApi.get(`?apikey=${APIKey}&s=${searchKey}&type=series`)

                    setTimeout(() => {
                        dispatch(addMovie(res.data.Search));
                    }, 500)
                }
                fetchMovies();
            }, [])

        return (
            <div>
                <h3 style={{margin: '1rem 0'}}>movies</h3>
                <input type="text" placeholder='Search...' />
                <MovieListing/>
            </div>
        )
        }

        export default Home


    -MovieListing.jsx ใช้จัด layout ส่ง prop ที่ได้มาจากการดึงค่า movie ด้วย useSelector() จากนั้นทำการ loop และให้ key ที่ไม่ซ้ำกัน

        .movie-container{
            margin: 1rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 1rem;
        }

        import React from 'react'
        import './MovieListing.scss'
        import { useSelector } from 'react-redux'

        // Components

        import MovieCard from '../MovieCard/MovieCard'

        function MovieListing() {

            const {movies} = useSelector((state) => state.movies)
            console.log(movies)
        
            return (
            <div className='movie-container'>
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        )
        }

        export default MovieListing
    

    -MovieCard.jsx แสดงข้อมูลหนังที่รับ props มาจาก MovieListing Component และสร้าง button สำหรับ link ไปหน้าอื่น
        โดยใช้ <Link to={`movie/${movie.imdbID}`}>read more</Link> ซึ่งเราจะต้งทำการสร้าง path เพื่อให้สามารถ link ไปหน้าอื่นได้
        โดยการ <Routes path='/movie:id' element={<componentname>}></Routes> ที่ไฟล์ app.jsx
        import React from 'react'
        import './MovieCard.scss'
        import {Link} from 'react-router-dom'

        function MovieCard({movie}) {
        return (
            <div className='card'>
                <div className="card-container">
                    <div>
                        <div className="card-image">
                            <img src={movie.Poster} alt={movie.Title} />
                        </div>
                        <div className="card-content">
                            <span className="card-title">
                                {movie.Title}
                            </span>
                            <p>Year:{movie.Year}</p>
                        </div>
                    </div>
                    <div className="card-action">
                        <Link to={`movie/${movie.imdbID}`}>read more</Link>
                    </div>
                </div>
            </div>
        )
        }

        export default MovieCard

11. ทำการสร้าง path ที่ app.jsx เพื่อแสดง component ที่แสดงรายละเอียดหนัง

    -App.jsx ทำการสร้าง path โดยเมื่อมีการเข้าถึง path /movie/123 จะทำการเรียก MovieDetail component และ รับค่า id ด้วย useParams
    เมื่อมีการกด button detail ซึ่ง button detail จะมีการ link ไปหน้า /movie/idของหนัง
    ดังนั้นจึงต้องการสร้าง path เพิ่อ link ไปหน้านั้นๆได้

        import MovieDetail from './components/MovieDetail/MovieDetail'

        function App() {

        return (
            <div>
                <Provider store={store}>
                    <Router>
                    <Header/>
                    <div className="container">
                        <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/movie/:id' element={<MovieDetail/>}></Route>
                        </Routes>
                    </div>
                    </Router>
                </Provider>
            </div>
        )
        }

        export default App

    -MovieDetail.jsx ทำการ useParams เพื่อนำเอา id จาก path /movie/:id
        ทำการ fetch api เมื่อมีการ reder component ครั้งแรก
        จากนั้นตรวจสอบเงื่อนไข loading ถ้า fetch api เสร็จให้ทำการแสดงรายละเอียดหนัง

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

12. สร้างการ search ที่ home.jsx

    -Home.jsx แก้ไข input เพิ่ม value = {moviename} onChange ={(e) => setMoviename(e.target.value)}
    จากนั้นเมื่อมีการพิมพ์ที่ input จะทำให้ state moviename มีการ update และ เรียกใช้ useEffect ที่มี dependencies เป็น moviename
    จากนั้นทำการเพิ่มเงื่อนไขเมื่อมีการ fetch api โดยหากเกิดการ error เนื่องจากได้รับ response มากเกินไปให้ทำการแสดงข้อความ response false

        import React, {useState, useEffect} from 'react'
        import MovieApi from '../../api/MovieApi'
        import { APIKey } from '../../api/MovieApiKey'
        import { useDispatch } from 'react-redux'
        import { addMovie } from '../../store/Reducer'

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

13. สร้าง Footer Component
    src -> Footer -> Footer.jsx, src -> Footer -> Footer.scss

    -Footer.jsx

        import React from 'react'
        import './Footer.scss'

        function Footer() {
        return (
            <div className="footer">
                copyright 2023
            </div>
        )
        }

        export default Footer

    -Footer.scss

        .footer{
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            padding: 0.5rem;
        }

13. สร้าง PageNotFound component และทำการแสดง component นี้เมื่อไม่พบ path
    src -> PageNotFound -> PageNotFound.jsx, src -> PageNotFound -> PageNotFound.scss

    -PageNotFound.jsx

        import React from 'react'
        import './PageNotFound.scss'

        function PageNotFound() {
        return (
            <div className='page-not-found'>
            <h2>Page not found</h2>
            </div>
        )
        }

        export default PageNotFound

    -PageNotFound.scss

        .page-not-found{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 500px;
        }

    -App.jsx สร้าง patch='*' เมื่อไม่พบ path จะแสดง PageNotFound

    function App() {

    return (
        <div>
        <Provider store={store}>
            <Router>
            <Header/>
            <div className="container">
                <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/movie/:id' element={<MovieDetail/>}></Route>
                <Route path='*' element={<PageNotFound/>}></Route>
                </Routes>
            </div>
            <Footer/>
            </Router>
        </Provider>
        </div>
    )
    }