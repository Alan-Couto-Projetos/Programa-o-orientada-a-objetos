// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

//Criação da classe piloto
export class piloto{
    #matricula;
    #nome;
    #habilitacaoAtiva;

    // Lista que armazena todos os parâmetros passados a cada new piloto criado
    static arrayPilotos = [];

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} matricula
    * @param {string} nome
    * @param {boolean} habilitacaoativa
    */


    constructor(matricula, nome, habilitacaoativa){
        validate(arguments, ['string', 'string', 'boolean']);

        this.#matricula = matricula;
        this.#nome = nome;
        this.#habilitacaoAtiva = habilitacaoativa;
        piloto.arrayPilotos.push([matricula, nome, habilitacaoativa]);
    };

    // Get que retorna se o piloto pode ou não voar
    get liberapiloto(){
        return this.#habilitacaoAtiva;
    };
    // Get que retorna se a matricula
    get matricula(){
        return this.#matricula;
    };
    // Get que retorna o nome
    get nome(){
        return this.#nome;
    };
};