import React from 'react';
import './App.css';
import {withRouter, Link} from 'react-router-dom';

class App extends React.Component {

    goToSimulator = (plano)=>{
        
        this.props.history.push(`/simulador/${plano}`);
    }


    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="img-responsive logo" src="assets/bwg_header.png" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h1 id="title">Simulador novos planos Unimed</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h2 id="sub-title">Qual plano deseja?</h2>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-4">
                            <div className="plan-box yellow" onClick={()=>this.goToSimulator('C')}>
                                <p>Plano Clássico</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="plan-box orange" onClick={()=>this.goToSimulator('E')}>
                                <p>Plano Estilo</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="plan-box purple" onClick={()=>this.goToSimulator('A')}>
                                <p>Plano Absoluto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(App);