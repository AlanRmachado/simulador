import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import services from '../../services';
import CurrencyInput from 'react-currency-input';
import './index.css'

class Simulador extends Component {

    state = {
        show: false,
        dependentes: [],
        firstFaixa: '0018',
        secondFaixa: '0018',
        catEstilo: 'er',
        showResult: false,
        totalApurado: 0.00,
        valAtual : '',
        valEco : 0,
        showEco : false
    }

    submitForm = (e) => {
        e.preventDefault();
        this.handleSimula();
    }

    openModal = () => {

        this.setState({ show: true });
    }

    closeModal = () => {
        this.setState({ show: false });
    }

    back = ()=>{
        this.setState({showResult : false});
    }

    handleFirstFaixa = (e) => {
        
        this.setState({ firstFaixa: e.target.value });

    }

    handleSecondFaixa = (e) => {
        this.setState({ secondFaixa: e.target.value });
    }

    handleCatEstilo = (e) => {
        this.setState({ catEstilo: e.target.value });

    }


    excluirDependente = (index, e) => {
        e.preventDefault();
        let dependentes = this.state.dependentes.map(e => e);
        dependentes.splice(index, 1);
        this.setState({ dependentes: dependentes });


    }




    handleValAtual = (e)=>{
        this.setState({valAtual : e.target.value});
    }

    addDependente = () => {
        let dependentes = this.state.dependentes.map(e => e);
        dependentes.push(this.state.secondFaixa);
        this.setState({ dependentes: dependentes });
        this.closeModal();
    }

    handleSimula = () => {
        const pPlano = this.props.match.params.plano;
        let totalApurado = 0;
        if (pPlano === 'C') {
            totalApurado = services.calculaPlanoClassico(this.state.firstFaixa, this.state.dependentes);
        } else if (pPlano === 'A') {
            totalApurado = services.calculaPlanoAbsoluto(this.state.firstFaixa, this.state.dependentes);
        } else {
            totalApurado = services.calculaPlanoEstilo(this.state.firstFaixa, this.state.dependentes, this.state.catEstilo);
        }

        totalApurado = totalApurado.toFixed(2);
        
        let valEco = this.state.valAtual - totalApurado;

        if(valEco > 0){
            this.setState({ totalApurado: totalApurado, showResult: true, showEco : true, valEco : valEco.toFixed(2) });
        }else{
            this.setState({ totalApurado: totalApurado, showResult: true, showEco : false });
        }
        
        

    }

    render() {
        //alert(this.props.match.params.plano)
        let color = '';
        let plano = '';
        const pPlano = this.props.match.params.plano;

        if (pPlano === 'C') {
            color = 'yellow';
            plano = 'Plano Clássico';
        } else if (pPlano === 'E') {
            color = 'orange';
            plano = 'Plano Estilo';
        } else if (pPlano === 'A') {
            color = 'purple';
            plano = 'Plano Absoluto';
        }

        function resolveText(item, index) {
            if (item.indexOf('A') === -1) {
                return `${index + 1} - Faixa de Idade : ${item.substring(0, 2)} - ${item.substring(2, 4)}`
            } else {
                return `${index + 1} - Faixa de Idade : Acima de 58 anos`
            }


        }

        const resolvePlanoEstilo = () => {
            if (pPlano === 'E') {
                return (
                    <div>
                        <div className="field">
                            <labe className="text-white">Qual a categoria do plano estilo ?</labe>
                            <select value={this.state.catEstilo} onChange={this.handleCatEstilo} name="faixa-idade" multiple="" class="ui fluid dropdown orange selectCat">
                                <option value="er">Estilo Enfermaria Regional</option>
                                <option value="ar">Estilo Apartamento Regional</option>
                                <option value="en">Estilo Enfermaria Nacional</option>
                                <option value="an">Estilo Apartamento Nacional</option>
                            </select>
                        </div>
                    </div>
                )
            }
        }

        let dependentes = this.state.dependentes.map((item, index) => {
            return (
                <div>
                    <li>

                        {resolveText(item, index)}
                        <span><a href="#" onClick={this.excluirDependente.bind(index, this)}> excluir</a></span>

                    </li>
                </div>
            );
        })

        if (dependentes.length === 0) {
            dependentes = 'Nenhum dependente adicionado.'
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h1 className={`title-plans ${color}`}>{plano}</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="formSimulador">
                            {
                                !this.state.showResult ? (
                                    <div>
                                        <form class="ui form" onSubmit={this.submitForm}>
                                            {resolvePlanoEstilo()}
                                            <div class="field">
                                                <div class="field">
                                                    <label>Qual o valor do seu plano atual?</label>
                                                    <div class="ui right labeled input valAtual">
                                                        <label for="amount" class="ui label" style={{ background: `${color}` }}>R$</label>
                                                        {/* <input type="text" name="valAtual" value={this.state.valAtual} onChange={this.handleValAtual} placeholder="0,00" id="amount" /> */}
                                                        <CurrencyInput  thousandSeparator="" className="alinharDireita" value={this.state.valAtual} onChangeEvent={this.handleValAtual}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="field">
                                                <labe className="text-white">Qual sua faixa de Idade ?</labe>
                                                <select value={this.state.firstFaixa} onChange={this.handleFirstFaixa} name="faixa-idade" multiple="" class="ui fluid dropdown selectAge">
                                                    <option value="0018">00 - 18</option>
                                                    <option value="1923">19 - 23</option>
                                                    <option value="2428">24 - 28</option>
                                                    <option value="2933">29 - 33</option>
                                                    <option value="3438">34 - 38</option>
                                                    <option value="3943">39 - 43</option>
                                                    <option value="4448">44 - 48</option>
                                                    <option value="4953">49 - 53</option>
                                                    <option value="5458">54 - 58</option>
                                                    <option value="Acima">Acima 58</option>
                                                </select>
                                            </div>

                                            <div className="field fieldDependentes">
                                                <button class="ui active button" type="button" onClick={this.openModal} style={{ background: `${color}`, color: '#fff' }}>
                                                    <i class="plus square outline icon"></i>
                                                    Adicionar Dependente
                                                </button>
                                                <label id="titleDepen">Dependentes</label>
                                                <ul>
                                                    {
                                                        dependentes
                                                    }
                                                </ul>
                                            </div>
                                            <button class="fluid ui button btnSimular">Simular</button>
                                        </form>
                                    </div>
                                ) : (
                                        <div className={`resultView ${color}`}>
                                            <h2>Total do Plano : R$ {this.state.totalApurado}</h2>
                                            {

                                                this.state.showEco ? (
                                                     <div>
                                                         <h2 id="valEconomizado">Você economizou R$ {this.state.valEco}</h2>
                                                     </div>   
                                                ) : ''

                                            }
                                            <button class="ui active button button-back" onClick={this.back}>
                                                <i class="angle left icon"></i>
                                                Voltar
                                            </button>
                                            <button class="ui active button" style={{ background: '#21BA45', color: '#fff' }} onClick={this.back}>
                                                
                                                Quero fazer a minha adesão =)
                                            </button>
                                        </div>
                                    )

                            }

                        </div>
                    </div>
                </div>

                <Modal show={this.state.show}>
                    <Modal.Header style={{ background: '#fff' }}>
                        <Modal.Title style={{ color: '#000' }}>Adicionar Dependente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: '#fff' }}>
                        <p>Qual a faixa de idade desse dependente ?</p>
                        <select value={this.state.secondFaixa} onChange={this.handleSecondFaixa} name="faixa-idade" multiple="" class="ui fluid dropdown selectAge">
                            <option value="0018">00 - 18</option>
                            <option value="1923">19 - 23</option>
                            <option value="2428">24 - 28</option>
                            <option value="2933">29 - 33</option>
                            <option value="3438">34 - 38</option>
                            <option value="3943">39 - 43</option>
                            <option value="4448">44 - 48</option>
                            <option value="4953">49 - 53</option>
                            <option value="5458">54 - 58</option>
                            <option value="Acima">Acima 58</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer style={{ background: '#fff' }}>
                        <Button style={{ background: '#21BA45', color: '#fff' }} onClick={this.addDependente}>Adicionar</Button>
                        <Button style={{ background: '#D01919', color: '#fff' }} onClick={this.closeModal}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default withRouter(Simulador);
//const token = this.props.match.params.token;
