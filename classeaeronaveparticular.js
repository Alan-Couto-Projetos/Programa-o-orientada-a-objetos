// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

import {aeronave} from './classeaeronave.js';

// Criação classe aeronave partícular
export class aeronaveParticular extends aeronave{
    #respManutencao;

    static arrayaeronaveParticular = [];

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} prefixo
    * @param {number} velocidadeCruzeiro
    * @param {number} autonomia
    * @param {string} respManutencao
    */
 
    constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao){
        validate(arguments,['string', 'number', 'number', 'string']);
        //Herança da classe aeronave
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#respManutencao = respManutencao;
        aeronaveParticular.arrayaeronaveParticular.push([prefixo, velocidadeCruzeiro, autonomia, respManutencao]);
    }
    
};