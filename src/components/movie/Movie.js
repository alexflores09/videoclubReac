import React, { Component } from 'react';
import MovieForm from "./MovieForm";

class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            product : {},
            movie : null,
            edit: false
        }
        this.rented = this.rented.bind(this);
        this.setRented = this.setRented.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:8000/api/movie/'+ this.props.match.params.id)
            .then(response => response.json())
            .then(product =>{
                this.setState({product,movie: product});
            })
            .catch(err => {
                console.error(err)
            });
    }

    rented(rent){
        if(rent){
            return (
                <a className="btn btn-secondary" onClick={()=>this.setRented(false)}>
                    Devolver película
                </a>
            );
        }
        else{
            return (
                <a className="btn btn-info" onClick={()=>this.setRented(true)}>
                    Alquilar película
                </a>
            );
        }
    }

    setRented(rent){
        this.setState({edit:false});

        const product = this.state.product;
        let type = "/return";
        if(rent)type = "/rent";

        fetch('http://localhost:8000/api/movie/'+ this.props.match.params.id+type,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data =>{
                if(!data.error){
                    product.rented = rent;
                    this.setState({product})
                }
                else{

                }
            })
            .catch(err => {
                console.error(err)
            });
    }

    deleteMovie(){
        fetch('http://localhost:8000/api/movie/'+ this.props.match.params.id,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data =>{
                if(!data.error){
                    document.location.href = '/catalog';
                }
                else{
                    alert(data.msg);
                }
            })
            .catch(err => {
                console.error(err)
            });
    }

    editMovie(){
        if(this.state.edit){
            this.setState({edit:false});
        }
        else{
            this.setState({edit:true});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <img src={this.state.product.poster} alt="Prueba" />
                </div>
                <div className="col-sm-8">
                    <h2>{this.state.product.title}</h2>
                    <h4>Año: {this.state.product.year}</h4>
                    <h4>Director: {this.state.product.director}</h4>
                    <p><b>Resumen: </b> {this.state.product.synopsis}</p>
                    <p><b>Estado: </b> {this.state.product.rented ? 'Película actualmente alquilada' : 'Alquilar película' }
                    </p>
                    <div className="col-sm-12">
                        {this.rented(this.state.product.rented)}
                        <a className="btn btn-warning" onClick={(e) => this.editMovie()} >Editar película</a>
                        <a className="btn btn-danger" onClick={()=> this.deleteMovie()}>Borrar
                            película</a>
                        <a href={'/catalog'} className="btn btn-outline-secondary">
                            <i className="fas fa-arrow-left"/>Volver al listado
                        </a>
                    </div>
                </div>
                <div className="col-lg-12">
                    { (this.state.edit)? <MovieForm movie={this.state.movie || {}} edit={true} onInput={this.handleInput} /> : '' }
                </div>
            </div>
        );
    }
}

export default Movie;
