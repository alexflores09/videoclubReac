import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Catalog extends Component {
    constructor(){
        super();
        this.state = {
            products : []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){

        fetch('http://localhost:8000/api/movie/')
        .then(response => response.json())
        .then(products =>{
            this.setState({products});
        })
        .catch(err => {
            console.error(err)
        });
    }

    handleClick(product){
        console.log(product);
    }

    renderMovie() {
        return this.state.products.map((product,i) => {
            return (
                <div className="card col-xs-6 col-sm-4 col-md-3" style={{marginTop:'10px'}} key={i}>
                    <img src={ product.poster } alt="Prueba" style={{height: '300px'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{ product.title }</h5>
                    </div>
                    <div className="card-body">
                        <Link to={'/catalog/'+product.id} className="card-link">Ver detalles</Link>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="row">
                { this.renderMovie() }
            </div>
        );
    }
}

export default Catalog;
