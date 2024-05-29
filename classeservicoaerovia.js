// Importação da função que valida os parâmetros.
import { validate } from "bycontract";

import {aerovia} from './classeaerovia.js';

// Criação da classe serviço aerovias, que devolve um array aerovia na função recupera
export class servicoAerovias{

    // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {string} origem
    * @param {string} destino
    */

    recupera(origem, destino){
        validate(arguments, ['string', 'string']);
        //Contador que devolve o número de aerovias criadas com a mesma origem e destino
        let cont = 0;
        //Armazena todos os arrays aerovias com origem e destino iguais.
        let totalaerovias = [];
        //For que vai percorre o array lista
        for(var i = 0; i < aerovia.arrayAerovias.length; i++){
            //If que verifica se a origem e destino passados para o parâmetro estão dentro do array aerovias,\
            // e se estão na posição correta que é primeiro origem e depois destino
            if((aerovia.arrayAerovias[i].includes(origem) && aerovia.arrayAerovias[i].includes(destino)) &&
            (aerovia.arrayAerovias[i][1] === origem && aerovia.arrayAerovias[i][2] === destino)){
                // Atualização do contador.
                cont++;
                // Guarda o array aerovia
                totalaerovias = aerovia.arrayAerovias[i];
                //Impressão que vai devolver todos os array aerovias que possui a mesma origem e destino
            };
            if (i === aerovia.arrayAerovias.length - 1){
                console.log(`A ordem do array é [id, origem, destino, tamanho].\n`)
                console.log(`Existe ${cont} array de aerovia que corresponde a origem e destino, sendo o seguinte:\n 
                ${totalaerovias}`);
            };
        };
        return `\n`;

    };
};