// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

// Criação da classe aerovia
export class aerovia{
    #id;
    #origem;
    #destino;
    #tamanho;

    // Array vazio que irá armazenar todos os new aerovia criados
    static arrayAerovias = [];

     // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} id
    * @param {string} origem
    * @param {string} destino
    * @param {number} tamanho
    */

    constructor(id, origem, destino, tamanho){
        validate(arguments, ['string', 'string', 'string', 'number']);
        this.#id = id;
        this.#origem = origem;
        this.#destino = destino;
        this.#tamanho = tamanho;
        //Lista que vai conter listas com id, origem, destino e tamanho  agrupados
        aerovia.arrayAerovias.push([id, origem, destino, tamanho]);
    }
};