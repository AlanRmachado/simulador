const classico = {
    '0018': 117.28,
    '1923': 173.74,
    '2428': 202.34,
    '2933': 224.14,
    '3438': 248.37,
    '3943': 270.09,
    '4448': 304.81,
    '4953': 355.51,
    '5458': 444.20,
    'Acima' : 702.53
}

const absoluto = {
    '0018': 207.10,
    '1923': 306.80,
    '2428': 357.30,
    '2933': 395.79,
    '3438': 438.59,
    '3943': 476.93,
    '4448': 538.24,
    '4953': 627.77,
    '5458': 784.38,
    'Acima' : 1240.55
}

const estiloER = {
    '0018': 144.80,
    '1923': 214.49,
    '2428': 249.80,
    '2933': 276.72,
    '3438': 306.63,
    '3943': 333.44,
    '4448': 376.31,
    '4953': 438.90,
    '5458': 548.40,
    'Acima' : 867.32
}


const estiloAR = {
    '0018': 178.10,
    '1923': 263.83,
    '2428': 307.26,
    '2933': 340.36,
    '3438': 377.15,
    '3943': 410.14,
    '4448': 462.86,
    '4953': 539.85,
    '5458': 674.53,
    'Acima' : 1066.80
}

const estiloEN = {
    '0018': 156.38,
    '1923': 231.65,
    '2428': 269.78,
    '2933': 298.86,
    '3438': 331.16,
    '3943': 360.12,
    '4448': 406.41,
    '4953': 474.01,
    '5458': 592.27,
    'Acima' : 936.71
}


const estiloAN = {
    '0018': 192.35,
    '1923': 284.94,
    '2428': 331.84,
    '2933': 367.59,
    '3438': 407.32,
    '3943': 442.95,
    '4448': 499.89,
    '4953': 583.04,
    '5458': 728.49,
    'Acima' : 1152.14
}


const services = {
    getValueClassico: function (key) {
        return classico[key];
    },

    getValueAbsoluto: function (key) {
        return absoluto[key];
    },



    getValueEstiloER: function (key) {
        return estiloER[key];
    },


    getValueEstiloAR: function (key) {
        return estiloAR[key];
    },


    getValueEstiloEN: function (key) {
        return estiloEN[key];
    },


    getValueEstiloAN: function (key) {
        return estiloAN[key];
    },



    calculaPlanoClassico : function(idadePrincipal, dependentes){
        let total = 0;
        let valPrincipal = this.getValueClassico(idadePrincipal);
        let totDependentes = dependentes.reduce((total, element)=>{
            return total += this.getValueClassico(element);
        },0)
        total = valPrincipal + totDependentes;
        return total;
    },

    calculaPlanoAbsoluto : function(idadePrincipal, dependentes){
        let total = 0;
        let valPrincipal = this.getValueAbsoluto(idadePrincipal);
        let totDependentes = dependentes.reduce((total, element)=>{
            return total += this.getValueAbsoluto(element);
        },0)
        total = valPrincipal + totDependentes;
        return total;
    },

    calculaPlanoEstilo : function(idadePrincipal, dependentes, categoria){
        let total = 0;
        let getValue = null;
        
        if(categoria === 'er'){
            getValue = this.getValueEstiloER;
        }else if(categoria === 'ar'){
            getValue = this.getValueEstiloAR;
        }else if (categoria === 'en'){
            getValue = this.getValueEstiloEN;
        }else{
            getValue = this.getValueEstiloAN;
        }
        
        
        
        let valPrincipal = getValue(idadePrincipal);
        let totDependentes = dependentes.reduce((total, element)=>{
            return total += getValue(element);
        },0)
        total = valPrincipal + totDependentes;
        return total;
    },
     formatReal : (  )=>{
        
    }
}

export default services;