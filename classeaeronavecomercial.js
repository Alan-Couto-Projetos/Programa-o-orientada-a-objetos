// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

import {aeronave} from './classeaeronave.js';

// Criação da classe de aeronave comercial
export class aeronaveComercial extends aeronave{
    #nomeCIA;

    static arrayaeronaveComercial = [];

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} prefixo
    * @param {number} velocidadeCruzeiro
    * @param {number} autonomia
    * @param {string} nomeCIA
    */

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA){
        validate(arguments, ['string', 'number', 'number', 'string']);
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#nomeCIA = nomeCIA;
        aeronaveComercial.arrayaeronaveComercial.push([prefixo, velocidadeCruzeiro, autonomia, nomeCIA]);
    }
};