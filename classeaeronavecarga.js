// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

import {aeronaveComercial} from './classeaeronavecomercial.js';

// Criação da classe aeronave carga
export class aeronaveCarga extends aeronaveComercial{
    #pesoMax;

    static arrayaeronaveCarga  = [];

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} prefixo
    * @param {number} velocidadeCruzeiro
    * @param {number} autonomia
    * @param {string} nomeCIA
    * @param {number} pesoMax
    */

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, pesoMax){
        validate(arguments, ['string', 'number', 'number', 'string', 'number'])
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCIA);
        this.#pesoMax = pesoMax;
        aeronaveCarga.arrayaeronaveCarga.push([prefixo, velocidadeCruzeiro, autonomia, nomeCIA, pesoMax]);
    }

};