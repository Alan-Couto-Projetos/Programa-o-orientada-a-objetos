// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

import {aeronaveComercial} from './classeaeronavecomercial.js';

// Criação da classe aeronaves passageiros
export class aeronavePassageiros extends aeronaveComercial{
    #maxPassageiros;

    static arrayaeronavePassageiros = [];

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} prefixo
    * @param {number} velocidadeCruzeiro
    * @param {number} autonomia
    * @param {string} nomeCIA
    * @param {number} maxPassageiros
    */

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, maxPassageiros){
        validate(arguments, ['string', 'number', 'number', 'string', 'number'])
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCIA);
        this.#maxPassageiros = maxPassageiros;
        aeronavePassageiros.arrayaeronavePassageiros.push([prefixo, velocidadeCruzeiro, autonomia, nomeCIA, maxPassageiros]);
    }
};