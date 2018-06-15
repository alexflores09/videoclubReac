import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Catalog from "./movie/Catalog";
import Movie from "./movie/Movie";
import Dashboard from "./Dashboard";
import MovieForm from "./movie/MovieForm";

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <div className="container" style={{marginTop: '30px'}}>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/catalog" component={Catalog} />
                        <Route exact path="/catalog/:id" component={Movie} />
                        <Route exact path="/add-movie" component={MovieForm} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
