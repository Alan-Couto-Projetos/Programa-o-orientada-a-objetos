import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

// Optei por importar apenas os serviços, pilotos e os 3 tipos de aeronaves que são definidos no matéria complementar
import * as classespiloto from './classepiloto.js';

import {Armazenagem, cadastro_piloto, servico_pilotos, servico_aerovias, 
    servico_aeronave, dadosnoarq, escolhe_aerovia, solicitarHorario} from './funcoes.js';


// Importando a função que irá armazenar os dados em um arquivo texto
import { LocalStorage } from 'node-localstorage';

//Armazenando os dados cadastrados em um arquivo texto
const localStorage = new LocalStorage('./dados_programa');

// Função que realiza o cancelamento do voo, e marca como cancelado no plano de voo
function cancelamento (){

    //escolha do ID, rota, e tamanho da rota
    var escolha = escolhe_aerovia();

    //Horário de partida do voo
    var horario = solicitarHorario();

    //Inicializa o bloco de repetição que solicita o  ID e o tipo de aeronave
    let sair = false;

    //Contador que determina se foi encontrado dados que corresponde as escolha do usuário
    let contador = 0;

    //Armazena o tipo de aeronave escolhido
    let tipo_aeronave  = '';

    //Chave para acesso ao plano de voo armazenado na memória
    var chave = 'planodevoo' + escolha[0];

    //Dados encontrados que corresponde ao plano de voo esccolhido
    var dadosvoo = dadosnoarq(chave);

    //Bloco de repetição que define o ID e o tipo de aeronave
    while  (!sair){
        //Escolha do ID
        console.log('Escolha o tipo de aeronave e informe o id da aeronave');
        console.log(`Você deve digitar o ID da aeronave`);
        var id = prompt('Digite o ID:');
            
        //Escolha da aeronave
        console.log('Escolha o tipo de aeronave:\n1 - aeronave carga\n2 - aeronave particular\n\
3 - aeronave passageiros');
        let numero = Number(prompt('Escolha uma opção do menu:'))
        function escolha_aeronave(){
            //Bloco IF que define  o tipo de aeronave escolhido
        if(numero >= 1 && numero <= 3){
            if (numero === 1){
                tipo_aeronave = 'aeronave carga';
            };
            if (numero === 2){
                tipo_aeronave = 'aeronave particular';
            };
            if (numero === 3){
                tipo_aeronave = 'aeronave passageiros';
            };
        }else{
            return escolha_aeronave;
        }
        }
        escolha_aeronave();

            console.log('Buscando os planos de voo com o ID escolhido');
            //Bloco que avalia se os dados contidos no plano de voo  corresponde
            //ao inserido pelo usuário
            for (var e = 0; e < dadosvoo.length; e++){
                //Avalia o ID
                if(dadosvoo[e]['id'][0] === id){
                    console.log(dadosvoo[e]);
                    //Avalia a rota escolhida
                    if ((dadosvoo[e]['dados'][2][1] === escolha[0] && 
                    dadosvoo[e]['dados'][2][2] === escolha[1]) &&
                    dadosvoo[e]['dados'][3][0] === horario){
                        dadosvoo[e]['dados'].push('cancelado');
                        contador += 1;
                    }
                };

            };
            //caso não haja dados
            if(contador === 0){
                console.log('Não existe dados de plano de voo com o ID escolhido');
                sair = true;
            };
            //Caso haja dados
            if (contador > 0){
                Armazenagem(dadosvoo, tipo_aeronave, chave);
                sair = true;
            };          
    };

}

function administra (){
    //inicializa o bloco de repetição
    let sair = false;

    //bloco de repetição que possibilita o acesso a cadastro de pilotos, aerovias, aeronaves, e a consulta de
    //aerovia, aeronaves e pilotos
    while(!sair){
        console.log('Seja bem-vindo ao sistema administrativo');
        //Menu de opções do usuário
        console.log(`Lista de opções:\n1 - cadastro de pilotos\n2 - consulta de pilotos\n\
3 - consulta de aerovias\n4 - consulta de aeronaves\n5 - cancelar plano de voo
6 - sair`);
        //entrada com a escolha do usuário
        let escolha = Number(prompt(`Digite a opção que deseja executar:`));
        //Bloco que encerra a sessão do usuário
        if(escolha === 6){
            //encerra a sessão
            sair = true;
            //Ignora todos os comandos escritos a baixo disso para encerrar o programa sem imprimir nada
            continue;
        };
        //Acessa a opção escolhida
        if (escolha >= 1 && escolha <= 6){
            if (escolha === 1){
                cadastro_piloto();
            };

            if (escolha === 2){
                servico_pilotos();
            };

            if (escolha === 3){
                servico_aerovias();
            };

            if (escolha === 4){
                servico_aeronave();
            };

            if (escolha === 5){
                cancelamento()
            };
        //Caso o usuário não escolha uma opção válida
        }else{
            console.log('Escolha uma opção válida')
        }
    };
};

administra();



//Função de armazenagem importada 
Armazenagem(classespiloto.piloto.arrayPilotos,'piloto', 'dadospiloto');