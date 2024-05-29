import { validate } from "bycontract";

import * as classepiloto from './classepiloto.js';
import { dadosnoarq } from "./funcoes.js";


// classe que exibe um piloto ou todos pilotos 
export class servicoPilotos {

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} matricula
    */
    
    //exibe apenas um piloto
    recupera(matricula){
        validate(matricula, 'string');
        let valido = [];
        
        // For que vai acessar todas listas de pilotos contidas em array pilotos
        for(var e = 0; e < classepiloto.piloto.arrayPilotos.length; e++){
            if(classepiloto.piloto.arrayPilotos[e].includes(matricula) === true && classepiloto.piloto.arrayPilotos[e][0] === matricula){
                console.log(`Dados do piloto com a matricula informada:\n ${classepiloto.piloto.arrayPilotos[e]}`)
                valido = classepiloto.piloto.arrayPilotos[e];
            }
        };
        return valido
    };

    //Criação da função que exibe um array com todos os new piloto criados
    todos(){
        let retorno = classepiloto.piloto.arrayPilotos.concat(dadosnoarq('dadospiloto'));
        console.log(`\nO array piloto é: \n sendo a ordem [[matricula, nome, habilitacaoAtiva],...]\n`, 
        retorno)
        return `\n`;
    };
};