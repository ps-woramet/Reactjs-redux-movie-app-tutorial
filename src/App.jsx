import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/Store'

// Components

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Footer from './components/Footer/Footer'
import PageNotFound from './components/PageNotFound/PageNotFound'


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

export default App
