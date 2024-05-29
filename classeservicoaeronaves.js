import {aeronaveCarga} from './classeaeronavecarga.js';

import {aeronaveParticular} from './classeaeronaveparticular.js';

import {aeronavePassageiros} from './classeaeronavepassageiros.js';

// Criação da classe serviço aeronave
export class servicoAeronaves{

    // JSDoc para determinar a que tipo cada parâmetro pertence
   /**
   * @param {string} tipoAeronave
   */

   // Como foi dito no matéria complementar que são considerados apenas 3 tipos de aeronaves vou exibir o array apenas dos tipos considerados
   todas(tipoAeronave){

       //Bloco IF para não exibir um array de dados vazio
       if (tipoAeronave === 'aeronave carga'){

           if (aeronaveCarga.arrayaeronaveCarga.length != 0){
               console.log('\nAeronaves de carga cadastradas:\n',aeronaveCarga.arrayaeronaveCarga);
           }else{
               console.log('\nNão foi cadastrado nenhuma aeronave do tipo aeronave de carga\n');
           }
       };

       //Bloco IF para não exibir um array de dados vazio
       if (tipoAeronave === 'aeronave passageiros'){

           if (aeronavePassageiros.arrayaeronavePassageiros.length != 0){
               console.log('\nAeronaves de passageiros cadastradas:\n',
               aeronavePassageiros.arrayaeronavePassageiros);
           }else{
               console.log('\nNão foi cadastrado nenhuma aeronave do tipo aeronave de passageiros\n');
           }
       };

       //Bloco IF para não exibir um array de dados vazio
       if  (tipoAeronave === 'aeronave particular'){

           if (aeronaveParticular.arrayaeronaveParticular.length != 0){
               console.log('\nAeronave particular cadastradas:\n',aeronaveParticular.arrayaeronaveParticular);
           }else{
               console.log('\nNão foi cadastrado nenhuma aeronave do tipo aeronave particular\n');
           }
       };
   };
};