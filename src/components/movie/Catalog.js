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

        if(localStorage.getItem('products') != null){
            console.log(JSON.parse(localStorage.getItem('products')))
            this.setState({
                products : JSON.parse(localStorage.getItem('products'))
            });
            console.log('encontro productos')
        }

        console.log('no encontro productos')

        /*fetch('http://localhost:8000/api/movie/')
        .then(response => response.json())
        .then(products =>{
            this.setState({products});
        })
        .catch(err => {
            console.error(err)
        });*/
    }

    handleClick(product){
        console.log(product);
    }

    renderMovie() {
        return Object.keys(this.state.products).map((product,i) => {
            return (
                <div className="card col-xs-6 col-sm-4 col-md-3" style={{marginTop:'10px'}} key={i}>
                    <img src={ this.state.products[product].poster } alt="Prueba" style={{height: '300px'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{ this.state.products[product].title }</h5>
                    </div>
                    <div className="card-body">
                        <Link to={'/catalog/'+this.state.products[product].id} className="card-link">Ver detalles</Link>
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
