// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

// Criação da classe aeronave
export class aeronave{
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} prefixo
    * @param {number} velocidadeCruzeiro
    * @param {number} autonomia
    */

    constructor(prefixo, velocidadeCruzeiro, autonomia){
        validate(arguments, ['string', 'number', 'number']);
        this.#prefixo = prefixo;
        this.#velocidadeCruzeiro = velocidadeCruzeiro;
        this.#autonomia = autonomia;
    }

};