//Importação que possibilita solicitar entradas de dados para o usuário 
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

import * as classeaeronave from './classeaeronave.js';

import * as classesaeronavecarga from './classeaeronavecarga.js';

import * as classesaeronaveparticular from './classeaeronaveparticular.js';

import * as classesaeronavepassageiros from './classeaeronavepassageiros.js';

import * as classespiloto from './classepiloto.js';

import {cadastro_aerovia, altitudedevoo, validação, escolhe_aerovia, solicitarHorario} from './funcoes.js';

// Importando a função que irá armazenar os dados em um arquivo texto
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./dados_programa');

function  loginpiloto(){
    let sair = false;
    let dados_funcao = [];
    let contador = 0;
    while (!sair){
        console.log('\nPara acessar o sistema de plano de voo digite a sua matricula');
        console.log('Para sair digite SAIR');
        let matricula = prompt('Digite a matricula:');
        if(matricula === 'SAIR'){
            sair = true;
            continue;
        };
        
        let dados = dadosnoarq('dadospiloto');
        for (var e = 0; e < dados.length; e++){
            if(dados[e]['id'] === matricula && dados[e]['dados'][2] === true){
                dados_funcao = acessopiloto()
                sair = true;
            }else{
                if (dados[e]['id'] === matricula && dados[e]['dados'][2] === false){
                    console.log('A habilitação está inativa, regularize sua habilitação');
                    contador += 1;
                };
                if (e === (dados.length - 1) && contador === 0){
                    console.log('A matricula não consta nos arquivos de dados');
                };
            }
        };
    };
   
    return dados_funcao;
}

// Função que vai inserir todos o membros correspondentes a cada classe,
// tendo em vista que existe membros diferentes que vão ser passado como parâmetros para os três tipos 
//de classes, essa função é usada na função cadastro aeronave
function modelos_aeronaves(aeronave_escolhida, array_aerovia){
    // Responsável por inicializar o bloco de repetição que solicita os membros das classes
    let sair = false;
    // Array que irá armazenar todos os membros que deve ser passado para a classe na respectiva ordem
    let entrada_aeronave = [];

    //Verificando se a aeronave escolhido está incluso na lista de modelos que estão disponíveis,
    //assim funciona apenas como uma medida de contenção caso seja feita alterações no switch case
    if (['aeronave de carga', 'aeronave particular', 'aeronave passageiros'].includes(aeronave_escolhida)){
            // Bloco de repetição que define todos os membros que deve ser passados para cada tipo de
            //aeronave
            while(!sair){
                //Verifica se o array já possui dados
                if (entrada_aeronave.length === 0){
                    //Entrada do membro que é comum a todas as classes aeronaves

                    //A entrada padrão do prompt já é do tipo string
                    let prefixo = prompt(`Digite o prefixo da aeronave:`);
                    //Adicionando o membro a lista de entrada
                    entrada_aeronave.push(prefixo);
                };
                
                //Verifica se o array já possui dados
                if (entrada_aeronave.length === 1){
                    //Entrada do membro que é comum a todas as classes aeronaves
                    let velocidadeCruzeiro = Number(prompt(`Digite a velocidade de cruzeiro em KM/h: `));
                    // validando se o dado passado corresponde ao respectivo tipo ao qual pertence
                    velocidadeCruzeiro = validação(velocidadeCruzeiro, "number");
                    if(velocidadeCruzeiro < 100){
                        let repetição = false;
                        while(!repetição){
                            console.log('A velocidade precisa ser de pelo menos 100');
                            velocidadeCruzeiro = Number(prompt(`Digite a velocidade de cruzeiro em KM/h: `));
                            if(velocidadeCruzeiro >= 100){
                                validação(velocidadeCruzeiro, "number");
                                repetição = true;
                            }
                        };
                    }
                    //Adicionando o membro a lista de entrada
                    entrada_aeronave.push(velocidadeCruzeiro);
                };
                
                //Verifica se o array já possui dados
                if (entrada_aeronave.length === 2){
                    //Entrada do membro que é comum a todas as classes aeronaves
                    let autonomia = Number(prompt(`Digite a autonomia da aeronave em KM:`));
                    // validando se o dado passado corresponde ao respectivo tipo ao qual pertence
                    autonomia = validação(autonomia, "number");
                    if (autonomia < Math.round((110/100)*array_aerovia[3])){
                        let repetir = false;
                        while(!repetir){
                            console.log(`A autonomia precisa ser pelo menos 10% maior que a aerovia, sendo\
 assim o valor de autonomia precisa ser maior que ${Math.round((110/100)*array_aerovia[3])}`);

                            //Entrada do membro que é comum a todas as classes aeronaves
                            let autonomia = Number(prompt(`Digite a autonomia da aeronave em KM:`));
                            // validando se o dado passado corresponde ao respectivo tipo ao qual pertence
                            autonomia = validação(autonomia, "number");
                            if (autonomia >= Math.round((110/100)*array_aerovia[3])){
                                repetir = true;
                            }
                        }
                    }
                    //Adicionando o membro a lista de entrada
                    entrada_aeronave.push(autonomia);
                };
                
                //Verifica se o array já possui dados, e solicita a entrada dos membros adicionais que
                //pertence a cada classe específica
                if (entrada_aeronave.length === 3){
                    // Adicionando os membros adicionais que compõe a classe carga
                    if (aeronave_escolhida === `aeronave de carga`){
                        //Membros adicionais que fazem parte da classe aeronave de carga

                        //A entrada padrão do prompt já é do tipo string
                        let nomeCIA = prompt(`Digite o nome da companhia:`);
                        let pesoMax = Number(prompt(`Digite o peso máximo suportado:`));
                        // validando se o dado passado corresponde ao respectivo tipo ao qual pertence
                        pesoMax = validação(pesoMax, "number");
                        //  Adicionando os membros adicionais a lista de entrada
                        entrada_aeronave.push(nomeCIA, pesoMax);
                        // Fazendo a distruibuição dos membros da classe no parâmetro,
                        // assim listando todos os membros no array de aeronave carga
                        // que possibilitará consultar os dados no futuro
                        let classe_nova = new classesaeronavecarga.aeronaveCarga(...entrada_aeronave);
                        // Finaliza o bloco de repetição
                        sair = true;
                    };

                    // Adicionando os membros adicionais que compõe a classe particular
                    if (aeronave_escolhida === `aeronave particular`){
                        //Membros adicionais que fazem parte da classe aeronave particular
                        //A entrada padrão do prompt já é do tipo string
                        let respManutencao = prompt(`Digite o nome do responsável pela manutenção:`);
                        //  Adicionando os membros adicionais a lista de entrada
                        entrada_aeronave.push(respManutencao);
                        // Fazendo a distruibuição dos membros da classe no parâmetro,
                        // assim armazenando os todos os termos no array de aeronave particular
                        // que possibilitará consultar os dados no futuro
                        let classe_nova = new classesaeronaveparticular.aeronaveParticular(...entrada_aeronave);
                        // Finaliza o bloco de repetição
                        sair = true;
                    };

                    // Adicionando os membros adicionais que compõe a classe passageiros
                    if (aeronave_escolhida === `aeronave passageiros`){
                        //Membros adicionais que fazem parte da classe aeronave passageiros

                        //A entrada padrão do prompt já é do tipo string
                        let nomeCIA = prompt(`Digite o nome da companhia:`);
                        let maxPassageiros = Number(prompt(`Digite o número máximo de passageiros:`));
                        // validando se o dado passado corresponde ao respectivo tipo ao qual pertence
                        maxPassageiros = validação(maxPassageiros, "number");
                        //  Adicionando os membros adicionais a lista de entrada
                        entrada_aeronave.push(nomeCIA, maxPassageiros);
                        // Fazendo a distruibuição dos membros da classe no parâmetro,
                        // assim listando todos os membros no array de aeronave passageiros
                        // que possibilitará consultar os dados no futuro
                        let classe_nova = new classesaeronavepassageiros.aeronavePassageiros(...entrada_aeronave);
                        // Finaliza o bloco de repetição
                        sair = true;
                    };
                };
            };
        };
        return entrada_aeronave;
};

// Criando o cadastro das aeronaves de forma automatica com um menu com opções que corresponde
//a cada tipo de aeronave, e o piloto pode realizar o cadastro apenas de uma aeronave por vez
function cadastro_aeronave(array_aerovia){
    let escolha = "";
    var retorno;
    // Termo que vai determinar quando foi escolhido uma opção do menu e encerrar as operações
    let tipo_aeronave_escolhido = false;

    //Bloco de repetição com o menu de escolha para os tipos de aeronaves e a opção de sair 
    while(!tipo_aeronave_escolhido){
        //Imprime na tela todas os tipos de aeronaves que podem ser escolhidos
        console.log(`\nEscolha um tipo de aeronave:\n1 - Aeronave de carga\n2 - Aeronave particular\
\n3 - Aeronave passageiros\n`);
        //Prompt para inserção da escolha desejada
        let entrada = Number(prompt(`Digite o número correspondente ao tipo de aeronave desejado:`));

        //Definição das operações que corresponde a cada opção de escolha do menu
        switch(entrada){
            case 1:
                // aeronave_escolhida = 'aeronave de carga';
                // Função responsável por definir os membros da classe 
                retorno = modelos_aeronaves('aeronave de carga', array_aerovia);
                tipo_aeronave_escolhido = true;
                escolha = 'aeronave carga';
                break;
            case 2:
                // aeronave_escolhida = 'aeronave particular';
                // Função responsável por definir os membros da classe
                retorno = modelos_aeronaves('aeronave particular', array_aerovia);
                tipo_aeronave_escolhido = true;
                escolha = 'aeronave particular';
                break;
            case 3:
                // aeronave_escolhida = 'aeronave passageiros';
                // Função responsável por definir os membros da classe
                retorno = modelos_aeronaves('aeronave passageiros', array_aerovia);
                tipo_aeronave_escolhido = true;
                escolha = 'aeronave passageiros';
                break;
            //Caso não seja selecionado uma opção que corresponda a um case
            default:
                console.log(`\nO tipo de aeronave escolhido não existe!`);
                return cadastro_aeronave(array_aerovia);
        };
        return [retorno,escolha];
    };
};

function solicitarData() {
    let sair = false;
    let data;

    while (!sair) {
        
        let entradaUsuario = prompt("Digite uma data no formato dd/mm/yyyy:");
       
        
        let formatoValido = /^\d{2}\/\d{2}\/\d{4}$/.test(entradaUsuario);
        
        if (formatoValido) {
            
            let partesData = entradaUsuario.split('/');
            let dia = parseInt(partesData[0], 10);
            let mes = parseInt(partesData[1], 10);
            let ano = parseInt(partesData[2], 10);

            if (dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12) {
                sair = true;
                return entradaUsuario
            } else {
                console.log("Data inválida");
                return solicitarData();
            }
        } else {
            console.log("O formato correto é dd/mm/yyyy.");
            return solicitarData()
        }
    }

    return data;
};


function calculahorario(array_aeronave, array_aerovia, horario) {
    let velocidade = Number(array_aeronave[1]);
    let tamanho = Number(array_aerovia[3]);
    let tempo = Math.round(tamanho / velocidade);
    // Separar horas e minutos
    var partesHorario = horario.split(":");
    // Verificar se há as partes de horas e minutos
    if (partesHorario.length === 2) {
        var horas = parseInt(partesHorario[0], 10);
        var minutos = parseInt(partesHorario[1], 10);
        
        horas += tempo;

        // Verificar se as horas e minutos são válidos
        if (!isNaN(horas) && !isNaN(minutos)) {
            while (horas > 23) {
                horas -= 24;
            }

            // Formatar as horas e minutos para ter dois dígitos
            var horasFormatadas = (horas < 10 ? '0' : '') + horas;
            var minutosFormatados = (minutos < 10 ? '0' : '') + minutos;

            // Criar o novo horário formatado
            horario = horasFormatadas + ':' + minutosFormatados;

            return horario;
        }
    }
};


function acessopiloto(){

    let sair = false;
    let array_aerovia = [];
    let origem = "";
    let destino = "";
    var array_altitude = [];
    let tipo_aeronave = "";
    let chave = "";
    let horario = "";
    var retorno_aeronave = [];


    while(!sair){
        console.log('realizando o cadastro');
        console.log(`É permitido realizar apenas um cadastro por vez, caso realize um novo cadastro todos os\ 
dados do anterior serão desconsiderados!!!`)
        console.log('Para sair digite 1, caso desejar prosseguir digite 2');
        let numero = Number(prompt("Digite a opção desejada:"));
        if (numero === 1 || numero === 2){
            if (numero === 1){
                sair = true;
                if(array_altitude.length != 0){
                    console.log('O identificador do plano de voo será',array_altitude[0][0])
                }
                continue;
            }
            if (numero === 2){
                console.log('\n');
                array_aerovia = cadastro_aerovia();
                console.log('\n');
                retorno_aeronave = cadastro_aeronave(array_aerovia);
                tipo_aeronave = retorno_aeronave[1];

                console.log('\n');
                horario = solicitarHorario(tipo_aeronave);
                console.log('\n');
                origem = array_aerovia[array_aerovia.length - 3];
                destino = array_aerovia[array_aerovia.length - 2];
                let horario_chegada = calculahorario(retorno_aeronave[0], array_aerovia, horario);
                array_altitude = altitudedevoo(tipo_aeronave, origem, destino, horario, horario_chegada);
                console.log('\n');
                var data = solicitarData();
                console.log('\n');
                chave = 'planodevoo' + origem;
                array_altitude.push(array_aerovia);
                array_altitude.push([horario, horario_chegada]);
                array_altitude.push([data]);
                array_altitude = [array_altitude];
                array_aerovia = [array_aerovia];
                
                
                
            }
        }else{
            console.log('Você precisa escolher uma opção listada no menu');
        }
        
    };
    return [array_altitude, array_aerovia, tipo_aeronave, chave];
};



function opções(){
    let sair = false;
    let dados_voo = [];
    while(!sair){
        console.log('Escolha uma opção:\n');
        console.log(`1 - Cadastro de plano de voo\n2 - lista de aerovia existentes entre dois aeroportos
3 - Altitudes livres em uma determinada aerovia e horário\n4 - Listar planos de voo existentes com base no ID
5 - planos de voo para uma determinada data\n6 - ocupação de uma aerovia em uma determinada data\n7 - sair`);

        let numero = Number(prompt('Escolha uma opção listada no menu:'));
        validação(numero, "number");
        if (numero === 7){
            sair = true;
            continue;
        };

        if  (numero === 1){
            dados_voo = loginpiloto()
            if (dados_voo.length != 0){
                //Armazenando os dados cadastrados em um arquivo texto
                Armazenagem(dados_voo[1],'aerovia','dadosaerovia');
                Armazenagem(dados_voo[0], dados_voo[2], dados_voo[3]);
                Armazenagem(classesaeronavecarga.aeronaveCarga.arrayaeronaveCarga, 'aeronave carga','dadosaeronavecarga');
                Armazenagem(classesaeronaveparticular.aeronaveParticular.arrayaeronaveParticular, 'aeronave particular', 'dadosaeronaveparticular');
                Armazenagem(classesaeronavepassageiros.aeronavePassageiros.arrayaeronavePassageiros, 'aeronave passageiros', 'dadosaeronavepassageiros');
            }
        };

        if (numero === 2){
            let origem_destino = [];
            const linhas_de_voo = ['POA', 'FLO', 'CWB', 'GRU'];
            //Opções permitidas para o usuário
            console.log('1 - POA\n2 - FLO\n3 - CWB\n4 - GRU');
            //Entrada que determina a origem do voo
            let numero_origem = Number(prompt(`Escolha a origem do voo:`));
            if (numero_origem >= 1 && numero_origem <= 4){
                //Usando o número escolhido para determinar qual índice da lista de voos possíveis armazenar na
                //entrada 
                origem_destino.push(linhas_de_voo[numero_origem-1]);
            };

            if (origem_destino.length === 1){
                //Menu de opções que o usuário pode escolher
                console.log('1 - POA\n2 - FLO\n3 - CWB\n4 - GRU\n5 - Nova origem');
                //Entrada que determina o destino do voo
                let numero_destino = Number(prompt(`Digite o destino do voo:`));
                //Bloco para apagar a origem e inserir uma nova
                if (numero_destino === 5){
                    //Removendo a origem do array de entradas, assim gerando uma nova solicitação para inserir
                    //uma origem 
                    entrada.splice(1,1);
                    //Continue para ignorar todo o bloco de if que segue abaixo, assim evitando que devolva o
                    //else por conta do número escolhido não estar na faixa de 1 a 4
                    continue;
                }
                //Condição que verifica se o número escolhido está entra a faixa permita, e se o local já não
                //foi escolhido como origem
                //Não fiz uso da função validação de entrada, visto que o bloco if e else já realiza essa validação
                if ((numero_destino >= 1 && numero_destino <= 4) && origem_destino.includes
                (linhas_de_voo[numero_destino-1]) === false){
                    //Usando o número escolhido para determinar qual índice da lista de voos possíveis armazenar na
                    //entrada 
                    origem_destino.push(linhas_de_voo[numero_destino-1]);
                }else{
                    //Caso em que o usuário escolhe o destino igual a origem
                    if (entrada.includes(linhas_de_voo[numero_destino-1])){
                        console.log(`\nEscolha um destino diferente da origem, a origem escolhida foi\
 ${linhas_de_voo[numero_destino-1]}\n`)
                    }else{
                        //Caso em que o usuário não escolhe um número que corresponde as opções dadas
                        console.log(`Você precisa escolher um número entre 1 e 5`)
                    }
                }
            };
        let chaveori = 'planodevoo' + origem_destino[0];
        let chavedest = 'planodevoo' + origem_destino[1];
        var dadosori = dadosnoarq(chaveori);
        var dadosdest = dadosnoarq(chavedest);

        if(dadosori.length != 0){
            console.log(`Os dados de aerovia do aeroporto de ${origem_destino[0]} são:\n`);
            for (var e = 0; e < dadosori.length; e++){
                let elemento = dadosori[e]['dados'][2];
                if(elemento[1] === origem_destino[0] && elemento[2] === origem_destino[1]){
                    console.log(elemento);
                }

            };
        }else{
            console.log(`Não há aerovias cadastradas para o aeroporto de ${origem_destino[0]}`);
        }

        if(dadosdest.length != 0){
            console.log(`Os dados de aerovia do aeroporto de ${origem_destino[1]} são:\n`);
            for (var e = 0; e < dadosdest.length; e++){
                let elemento = dadosdest[e]['dados'][2];
                if(elemento[1] === origem_destino[1] && elemento[2] === origem_destino[0]){
                    console.log(elemento);
                }

            };
        }else{
            console.log(`Não há aerovias cadastradas partido do aeroporto de ${origem_destino[1]}`);
        }
        };

        if (numero === 3){
            var altitude_usadas = [];
            var livre = [];
            var escolha = escolhe_aerovia();
            var horario = solicitarHorario();
            var chaveori = 'planodevoo' + escolha[0];
            var chavedest = 'planodevoo' + escolha[1];
            var dadosori = dadosnoarq(chaveori);
            var dadosdest = dadosnoarq(chavedest);

            if(dadosori.length != 0){
                for (var e = 0; e < dadosori.length; e++){
                    var elemento = dadosori[e]['dados'][2];
                    var elemento2 = dadosori[e]['dados'][3];
                    if ((elemento[1] === escolha[0] && elemento[2] === escolha[1]) && 
                    elemento2[0] === horario){
                        altitude_usadas.push(dadosori[e]['dados'][1]);
                    }
                };
            };

            if(dadosdest.length != 0){
                for (var e = 0; e < dadosdest.length; e++){
                    var elemento = dadosdest[e]['dados'][2];
                    var elemento2 = dadosdest[e]['dados'][3];
                    if ((elemento[1] === escolha[1] && elemento[2] === escolha[0]) && 
                    elemento2[0] === horario){
                        altitude_usadas.push(dadosdest[e]['dados'][1]);
                    }
                };
            };
            let verifica = 25000;
            for (var e = 0; e < 10; e++){
                if(altitude_usadas.includes(verifica) === true || livre.includes(verifica)){
                    verifica += 1000;
                    livre.push(verifica);
                }
            }
            if (livre.length != 0){
                console.log(`A lista de altitudes livres é:\n`, ...livre);
            }
            if (dadosori.length === 0){
                console.log(`Não foi cadastrado nenhuma altitude para ${escolha[0]}`);
            };
            if (dadosdest.length === 0){
                console.log(`Não foi cadastrado nenhuma altitude para ${escolha[1]}`);
            };
        };

        if (numero === 4){
            var dados = [];
            const linhas_de_voo = ['POA', 'FLO', 'CWB', 'GRU'];
            let contador = 0;
            console.log(`Você deve digitar o ID da aeronave que deseja consultar, pois o ID do plano de voo\
 foi criado utlizando o cadastro de aeronave`);
            var id = prompt('Digite o ID:');
            for(var e = 0; e < linhas_de_voo.length; e++){
                let chave = 'planodevoo' + linhas_de_voo[e];
                var dadosvoo = dadosnoarq(chave);
                if(dadosvoo.length != 0){
                    dados.push(...dadosvoo);
                } 
            };

            console.log('Buscando os planos de voo com o ID escolhido');
            for (var e = 0; e < dados.length; e++){
                if(dados[e]['id'][0] === id){
                    console.log(dados[e]);
                    contador += 1;
                }
            };
            
            if(contador === 0){
                console.log('Não existe dados de plano de voo com o ID escolhido');
            }
        };

        if (numero === 5){
            var contador = 0;
            const linhas_de_voo = ['POA', 'FLO', 'CWB', 'GRU'];
            var data = solicitarData();
            for(var e = 0; e < linhas_de_voo.length; e++){
                let chave = 'planodevoo' + linhas_de_voo[e];
                var dadosvoo = dadosnoarq(chave);
                if(dadosvoo.length != 0){
                    for (var x = 0; x < dadosvoo.length; x++){
                        if(data === dadosvoo[x]['dados'][4][0]){
                            console.log(dadosvoo[x]);
                            contador += 1;
                        }
                    }
                }
            };
            if (contador === 0){
                console.log(`\nNão existe planos de voo para a data de ${data}\n`);
            };
          
            
        };

        if (numero === 6){
            var contador = 0;
            const linhas_de_voo = ['POA', 'FLO', 'CWB', 'GRU'];
            var data = solicitarData();
            for(var e = 0; e < linhas_de_voo.length; e++){
                let chave = 'planodevoo' + linhas_de_voo[e];
                var dadosvoo = dadosnoarq(chave);
                if(dadosvoo.length != 0){
                    for (var x = 0; x < dadosvoo.length; x++){
                        if(data === dadosvoo[x]['dados'][4][0]){
                            console.log('A aerovia', ...dadosvoo[x]['dados'][2]);
                            console.log('está ocupado no dia e horário', dadosvoo[x]['dados'][4], dadosvoo[x]['dados'][3]);
                            contador += 1;
                        }
                    };
                }
            };
            if (contador === 0){
                console.log(`Não há nenhuma aerovia ocupada na data informada de ${data}`);
            };
            
        };

    }
    return dados_voo
}

var dados_voo = opções();

//Verifica se já existe dados nos arquivos textos 
function dadosnoarq(chave) {
    // Recuperar dados existentes
    const dadosExistentetexto = localStorage.getItem(chave);
    //caso não houver dados devolve um array vazio
    let dadosExistente = dadosExistentetexto ? JSON.parse(dadosExistentetexto) : [];
    //devolvendo os dados encontrados
    return dadosExistente;
  };

//realiza a armazenagem de dados novos e dados que já existe no arquivo texto
function Armazenagem(arraydedados, definatipo, chave){
    //Laço para acessar os item id, e dados no array de dados, sendo que o id sempre será o primeiro item
    // de cada subarray
    for (var e = 0; e < arraydedados.length; e++){

        let dados = {
            //Criando o id
            id: arraydedados[e][0],
            //Define o tipo
            tipo: definatipo,
            //Armazena o subarray todo
            dados: arraydedados[e]
          };
          //obtendo o array de dados já existe, caso não houver recebe um array vazio
          let dadosExistente = dadosnoarq(chave);

          //Efetua o espalhamento do array para ser armazenado novamente
          let dadosconcatena = [...dadosExistente, dados];
          localStorage.setItem(chave, JSON.stringify(dadosconcatena));
    };
};



