import React from 'react';
import { useEffect , useState} from 'react';

import searchIcon from "./search.svg"
import MovieCard from './MovieCard';
import "./app.css"

const api_url = "http://www.omdbapi.com?apikey=5c95d98b";


const App = () => {

    const[movies, setMovies] = useState([])
    const[searchTerm, setSearchTerm] = useState('')
	
    const searchMovies = async(title) => {
		const response =  await fetch(`${api_url}&s=${title}`)
        const data =  await response.json()
        setMovies(data.Search)
    }
	

    useEffect(() => {
        searchMovies("")
    }, [])


    return (
			<div className="app">
				<h1>Movie Land</h1>
				<div className="search">
					<input
						placeholder="Search a Movie"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<img
						src={searchIcon}
						alt="search"
						onClick={() => {
							searchMovies(searchTerm);
						}}
					/>
				</div>
				{movies?.length > 0 ? (
					<div className="container">
						{movies.map((movie) => (
							<MovieCard movie = {movie} />
						))}
					</div>
				) : (<div className='empty'>
						<h2>No Movies Found</h2>
					</div>)
				}
			</div>
		);
}

export default App

