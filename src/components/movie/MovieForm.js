import React, { Component } from 'react';

class MovieForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            movie : this.props.movie || {},
            edit : this.props.edit || false
        };
        this.handleInput = this.handleInput.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({
            movie:this.props.movie,
            edit:this.props.edit,
        })
    }

    getButton(){
        if(this.state.edit){
            return (
                <label>
                    <i className="far fa-edit" />
                    Modificar película
                </label>
            );
        }
        else{
            return (
                <label>
                    <i className="fas fa-plus-circle" />
                    Agregar película
                </label>
            );
        }
    }

    saveMovie(e){
        e.preventDefault();

        if(this.state.movie.id){
            fetch('http://localhost:8000/api/movie/'+ this.state.movie.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.movie)
            })
                .then(response => response.json())
                .then(response =>{
                    if(!response.error){
                        document.location.reload();
                    }
                    else{
                        alert(response.msg);
                    }
                })
                .catch(err => {
                    console.error(err)
                });
        }
        else{
            fetch('http://localhost:8000/api/movie/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.movie)
            })
                .then(response => response.json())
                .then(response =>{
                    if(!response.error){
                        document.location.href = '/catalog';
                    }
                    else{
                        alert(response.msg);
                    }
                })
                .catch(err => {
                    console.error(err)
                });
        }
    }

    handleInput(key, e) {
        const state = Object.assign({}, this.state.movie);
        state[key] = e.target.value;
        this.setState({movie: state });
    }

    render() {
        return (
            <div className="row" style={{marginTop:'30px'}}>
                <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-sm-12">
                    <div className="card">
                        <div className="card-header text-center">
                            {(this.state.edit) ? 'Modificar película' : 'Agregar película'}
                        </div>
                        <div className="card-body" style={{padding:'30px'}}>
                            <form action="/" method="POST" onSubmit={(e)=>this.saveMovie(e)}>
                                <div className="form-group">
                                    <label htmlFor="txtTitle">Título</label>
                                    <input type="text" className="form-control" id="txtTitle" onChange={(e)=> this.handleInput('title',e)}
                                           required value={this.state.movie.title || ''}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtYear">Año</label>
                                    <input type="text" className="form-control" name="txtYear" id="txtYear" required onChange={(e)=> this.handleInput('year',e)}
                                           value={this.state.movie.year || ''}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtDirector">Director</label>
                                    <input type="text" className="form-control" name="txtDirector" id="txtDirector"  onChange={(e)=> this.handleInput('director',e)}
                                           required value={this.state.movie.director || ''}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtPoster">Poster</label>
                                    <input type="text" className="form-control" name="txtPoster" id="txtPoster"  onChange={(e)=> this.handleInput('poster',e)}
                                           required value={this.state.movie.poster || ''}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtSynopsis">Synopsis</label>
                                    <textarea className="form-control" name="txtSynopsis"  onChange={(e)=> this.handleInput('synopsis',e)}
                                              id="txtSynopsis" value={this.state.movie.synopsis || ''} />
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" name="btnSave" className="btn btn-primary"
                                            style={{padding: '8px 100px',marginTop:'25px'}}>
                                        {this.getButton()}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieForm;