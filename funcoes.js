//Importação que possibilita solicitar entradas de dados para o usuário 
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

import * as classepiloto from './classepiloto.js';

import * as classesaeronaveparticular from './classeaeronaveparticular.js';

import * as classesaeronavepassageiros from './classeaeronavepassageiros.js';

import * as classesaeronavecarga from './classeaeronavecarga.js';

import * as classesaerovia from './classeaerovia.js';

import * as classesservicoaeronaves from './classeservicoaeronaves.js';

import * as classesservicopilotos from './classeservicopiloto.js';

import * as classesservicoaerovias from './classeservicoaerovia.js';

// Importando a função que irá armazenar os dados em um arquivo texto
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./dados_programa');

//Função para a validação dos dados
import { validate } from "bycontract";

  // JSDoc para determinar a que tipo cada parâmetro pertence
    /**
    * @param {variável} entrada
    * @param {tipo_em_minusculo} tipo_entrada
    */



export function solicitarHorario(tipo_aeronave) {
    var horario = prompt("Insira um horário no formato HH:mm:");

    // Separar horas e minutos
    var partesHorario = horario.split(":");

    // Verificar se há as partes  de horas e minutos
    if (partesHorario.length === 2) {
        var horas = parseInt(partesHorario[0], 10);
        var minutos = parseInt(partesHorario[1], 10);

        }
        // Verificar se as horas e minutos são válidos
        if (!isNaN(horas) && !isNaN(minutos) && horas >= 0 && horas <= 23 && minutos >= 0 && minutos <= 59) {
            if (tipo_aeronave != 'aeronave carga'){
                return horario;
            };
            if (tipo_aeronave === 'aeronave carga'){
                if(horas < 23 && horas > 6){
                    console.log('Aeronave de carga só pode voar entre 00:00 às 06:00');
                    return solicitarHorario();
                }else{
                    return horario;
                }
            
        }
    }else{
        console.log('O horário digitado está errado');
        return solicitarHorario();
    }
};

export function escolhe_aerovia(){
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
        return origem_destino;
}
    
// Função recursiva que valida se a entrada corresponde o tipo de dados q ela deve ter
export function validação(entrada, tipo_entrada){

    //Bloco com o validate da entrada, e catch para solicitar um valor novo que corresponda ao tipo 
    try{
        validate(entrada, tipo_entrada);
    }catch(error){
        entrada = Number(prompt(`Digite uma entrada nova que seja do tipo ${tipo_entrada}:`));
        validação(entrada, tipo_entrada);
    }
    return entrada
};  

// Criando o cadastro dos pilotos para não precisar criar a classe de forma manual
export function cadastro_piloto(){

    let sair = false;
    let entrada = [];
    // Bloco while que possibilita solicita a passagem dos membros da classe na respectiva ordem 
    while(!sair){
        
        // Solicita a entrada do primeiro membro
        if (entrada.length === 0){

            //A entrada padrão do prompt já é do tipo string
            let matricula = prompt(`Digite a matricula do piloto: `);
            // Armazena o membro da classe na lista
            entrada.push(matricula);
        };

        // Solicita a entrada do segundo membro
        if (entrada.length === 1){

            //A entrada padrão do prompt já é do tipo string
            let nome = prompt(`Digite o nome do piloto: `);
            // Armazena o membro da classe na lista
            entrada.push(nome);
        };

        // Solicita a entrada do terceiro membro
        if (entrada.length === 2){

            //A entrada padrão do prompt já é do tipo string
            let habilitacao = prompt(`Digite se a habilitação está ativa ou inativa:`);
            // Tratamento que não permite uma entrada que não seja ativa ou inativa
            if (habilitacao  != 'ativa' && habilitacao != 'inativa'){
                //Solicitando novamente a entrada de habilitação
                //A entrada padrão do prompt já é do tipo string
                let habilitacao = prompt(`A habilitação deve estar no formato ativa ou inativa:`);
                //Verificando se a entrada nova está correta
                if (habilitacao === 'ativa'){
                    // Armazena o membro da classe na lista
                    entrada.push(true);
                }else{
                    // Armazena o membro da classe na lista
                    entrada.push(false);
                }
            // Caso a entrada seja igual ativa ou inativa
            }else{
                //Habilitação ativa corresponde a true
                if (habilitacao === 'ativa'){
                    // Armazena o membro da classe na lista
                    entrada.push(true);
                //No caso da inativa recebe false
                }else{
                    // Armazena o membro da classe na lista
                    entrada.push(false);
                }
            }
        };
        // Quando a lista atinge o número de parâmetros que devem ser passados para a classe
        if (entrada.length === 3){
            // Criando o a classe com o espalhamento dos valores de entrada na classe
             let classe_nova = new classepiloto.piloto(...entrada);
            break;
        };

    };
    //Retornando uma quebra de linha para a função não devolver undefined 
    return `\n`;
};

//Verificando a  rota de voo informado pelo o usuário para determinar
//todas as altitudes usadas
export function verificaRota (array, origem, destino, horario, horario_chegada){
    //conta o numero de rotas existentes
    let contador_rotas = 0;
    //Armazena todas as altitudes utlizadas
    let altitudes_usadas = [];

    for (let i = 0; i < array.length; i++) {
        let elemento = array[i];
        //verifica se o voo não foi cancelado
        if (elemento['dados'][5] === undefined){ 
            //verifica o horario de partiida e chegada
            if (elemento['dados'][3][0] === horario && elemento['dados'][3][1] === horario_chegada){
                let rotaorigem = elemento['dados'][2][1];
                let rotadestino = elemento['dados'][2][2];
                //verifica a rota do voo
                if ((rotaorigem === origem && rotadestino === destino)){
                    contador_rotas += 1;
                    //Caso todos os dados sejam correspondentes armazena a altitude no array
                    altitudes_usadas.push(elemento['dados'][1]);
                };
            };  
        };
    };
    //Retorna o array altitude e o contador dee rotas
    return [altitudes_usadas, contador_rotas];
};

//Verifica no array de dados apenas os dados que corresponde ao tipo informado
export function verificaConteudo(array, tipo) {
    //Armazena os dados
    var array_elementos = [];
    //Conta se existe tipos iguais nos dados
    let contador_aerovia = 0; 
    for (let i = 0; i < array.length; i++) {
        let elemento = array[i];
        // Verifica se o tipo é igual o informado,
        //por exemplo verifica se o dados de voo é do tipo "aeronave particular"
        if (elemento.tipo === tipo) {
            contador_aerovia += 1;
            //Armazena apenas os dados que corresponde ao tipo definido 
            array_elementos.push(elemento)
        };
      }
    //Retorna um array com apenas o tipo de dados definido
    return array_elementos;
  };


  //Responsável por determinar a altitude que cada aeronave deve ficar
export function altitudedevoo (tipoaeronave, origem, destino, horario, horario_chegada){
    //array que cria o plano de voo
    var arrayplanodevoo = [];
    if (tipoaeronave === 'aeronave particular'){
        //define a chave de acesso ao plano de voo de origem
        let chave1 = 'planodevoo' + origem;
        //define a chave de acesso ao plano de voo de destino
        let chave2 = 'planodevoo' + destino;
        //Array que irá armazenar todas as altitudes utlizadas na rota de origem e destino
        var altitudes_utilizadas = [];

        //Extrai dos dados os dados que são iguais ao tipo de aeronave
        let dadospassageirosori = verificaConteudo(dadosnoarq(chave1), 'aeronave passageiros');
        let dadospassageirodest = verificaConteudo(dadosnoarq(chave2), 'aeronave passageiros');
        let dadosparticularori = verificaConteudo(dadosnoarq(chave1), 'aeronave particular');
        let dadosparticulardest = verificaConteudo(dadosnoarq(chave2), 'aeronave particular');
        let dadoscargaori = verificaConteudo(dadosnoarq(chave1), 'aeronave carga');
        let dadoscargadest = verificaConteudo(dadosnoarq(chave2), 'aeronave carga');

        //Determina todas as altitudes utlizadas 
        var retorno_passageirosori = verificaRota(dadospassageirosori, origem, destino, horario, horario_chegada);
        var retorno_passageirosdest = verificaRota(dadospassageirodest, destino, origem, horario, horario_chegada);
        var retorno_particularori = verificaRota(dadosparticularori, origem, destino, horario, horario_chegada);
        var retorno_particulardest = verificaRota(dadosparticulardest, destino, origem, horario, horario_chegada);
        var retorno_cargaori = verificaRota(dadoscargaori, origem, destino, horario, horario_chegada);
        var retorno_cargadest = verificaRota(dadoscargadest, destino, origem, horario, horario_chegada);

        //Realiza o espalhamento de todas as altitudes utilizadas
        altitudes_utilizadas = [...retorno_passageirosori[0], ...retorno_passageirosdest[0], 
        ...retorno_particularori[0], ...retorno_particulardest[0],
         ...retorno_cargaori[0], ...retorno_cargadest[0]];
        
        //Caso ainda não tenha nenhuma altitude ocupada vai definir a primeira altitude em 25000
        if ((altitudes_utilizadas.length === 0) && (retorno_cargaori[1] === 0 && retorno_cargadest[1] === 0)){
                arrayplanodevoo = [...classesaeronaveparticular.aeronaveParticular.arrayaeronaveParticular];
                arrayplanodevoo.push(25000);
                return arrayplanodevoo;
        //Caso já tenha dados de voo armazenados
        }else{
            //define a primeira altitude como 25000
            let dados1 = 25000;
            //Inicializa o bloco de repetição
            let sair = false;
            while (!sair){
                //verifica se a altitude já foi utilizada, caso tenha sido passa para a proxima altitude
                if(altitudes_utilizadas.includes(dados1) === true){
                    dados1 += 1000;
                    if(dados1 > 27000){
                        sair = true;
                    };
                }else{
                    //finaliza a repetição quando encontrar uma altitude que está livre
                    sair = true;
                }

            };
            //verifica se a aeronave está dentro dos limites permitidos de altitude
            if(dados1 > 25000 && dados1 <= 27000){
                //Armazena os dados de cadastro da aeronave
                arrayplanodevoo = [...classesaeronaveparticular.aeronaveParticular.arrayaeronaveParticular];
                //adiciona a altitude de voo da aeronave
                arrayplanodevoo.push(dados1);
                return arrayplanodevoo;
            }else{
                //caso todas as altitudes esteja ocupadas
                console.log('\nTodas as altitudes de voo já foram utilizadas\n');
                console.log('Você precisa realizar o seu voo em outro horário');
                console.log('As faixas de altitudes ocupadas são:\n', ...altitudes_utilizadas);
            }
        };
    };

    if (tipoaeronave === 'aeronave passageiros'){
        //define a chave de acesso ao plano de voo de origem
        let chave1 = 'planodevoo' + origem;
        //define a chave de acesso ao plano de voo de destino
        let chave2 = 'planodevoo' + destino;
        //Array que irá armazenar todas as altitudes utlizadas na rota de origem e destino
        var altitudes_utilizadas = [];

        //Extrai dos dados os dados que são iguais ao tipo de aeronave
        let dadospassageirosori = verificaConteudo(dadosnoarq(chave1), 'aeronave passageiros');
        let dadospassageirodest = verificaConteudo(dadosnoarq(chave2), 'aeronave passageiros');
        let dadosparticularori = verificaConteudo(dadosnoarq(chave1), 'aeronave particular');
        let dadosparticulardest = verificaConteudo(dadosnoarq(chave2), 'aeronave particular');
        let dadoscargaori = verificaConteudo(dadosnoarq(chave1), 'aeronave carga');
        let dadoscargadest = verificaConteudo(dadosnoarq(chave2), 'aeronave carga');
        //Determina todas as altitudes utlizadas 
        var retorno_passageirosori = verificaRota(dadospassageirosori, origem, destino, horario, horario_chegada);
        var retorno_passageirosdest = verificaRota(dadospassageirodest, destino, origem, horario, horario_chegada);
        var retorno_particularori = verificaRota(dadosparticularori, origem, destino, horario, horario_chegada);
        var retorno_particulardest = verificaRota(dadosparticulardest, destino, origem, horario, horario_chegada);
        var retorno_cargaori = verificaRota(dadoscargaori, origem, destino, horario, horario_chegada);
        var retorno_cargadest = verificaRota(dadoscargadest, destino, origem, horario, horario_chegada);
        //Realiza o espalhamento de todas as altitudes utilizadas
        altitudes_utilizadas = [...retorno_passageirosori[0], ...retorno_passageirosdest[0], 
        ...retorno_particularori[0], ...retorno_particulardest[0],
         ...retorno_cargaori[0], ...retorno_cargadest[0]];
        
        //Caso ainda não tenha nenhuma altitude ocupada vai definir a primeira altitude em 28000
        if ((altitudes_utilizadas.length === 0) && (retorno_cargaori[1] === 0 && retorno_cargadest[1] === 0)){
                arrayplanodevoo = [...classesaeronavepassageiros.aeronavePassageiros.arrayaeronavePassageiros];
                arrayplanodevoo.push(28000);
                return arrayplanodevoo;
        }else{
            //define a primeira altitude como 28000
            let dados1 = 28000;
            //Inicializa o bloco de repetição
            let sair = false;
            while (!sair){
                //verifica se a altitude já foi utilizada, caso tenha sido passa para a proxima altitude
                if(altitudes_utilizadas.includes(dados1) === true){
                    dados1 += 1000;
                    if (dados1 > 35000){
                        sair = true;
                    }
                }else{
                     //finaliza a repetição quando encontrar uma altitude que está livre
                    sair = true;
                }

            };
            //verifica se a aeronave está dentro dos limites permitidos de altitude
            if(dados1 > 28000 && dados1 <= 35000){
                //Armazena os dados de cadastro da aeronave
                arrayplanodevoo = [...classesaeronavepassageiros.aeronavePassageiros.arrayaeronavePassageiros];
                //adiciona a altitude de voo da aeronave
                arrayplanodevoo.push(dados1);
                return arrayplanodevoo;
            }else{
                //caso todas as altitudes esteja ocupadas
                console.log('\nTodas as altitudes de voo já foram utilizadas\n');
                console.log('Você precisa realizar o seu voo em outro horário');
                console.log('As faixas de altitudes ocupadas são:\n', ...altitudes_utilizadas);
            }
        };
    };

    if (tipoaeronave === 'aeronave carga'){
        //define a chave de acesso ao plano de voo de origem
        let chave1 = 'planodevoo' + origem;
        //define a chave de acesso ao plano de voo de destino
        let chave2 = 'planodevoo' + destino;
        //Array que irá armazenar todas as altitudes utlizadas na rota de origem e destino
        var altitudes_utilizadas = [];

        //Extrai dos dados os dados que são iguais ao tipo de aeronave
        let dadospassageirosori = verificaConteudo(dadosnoarq(chave1), 'aeronave passageiros');
        let dadospassageirodest = verificaConteudo(dadosnoarq(chave2), 'aeronave passageiros');
        let dadosparticularori = verificaConteudo(dadosnoarq(chave1), 'aeronave particular');
        let dadosparticulardest = verificaConteudo(dadosnoarq(chave2), 'aeronave particular');
        let dadoscargaori = verificaConteudo(dadosnoarq(chave1), 'aeronave carga');
        let dadoscargadest = verificaConteudo(dadosnoarq(chave2), 'aeronave carga');
        //Determina todas as altitudes utlizadas
        var retorno_passageirosori = verificaRota(dadospassageirosori, origem, destino, horario, horario_chegada);
        var retorno_passageirosdest = verificaRota(dadospassageirodest, destino, origem, horario, horario_chegada);
        var retorno_particularori = verificaRota(dadosparticularori, origem, destino, horario, horario_chegada);
        var retorno_particulardest = verificaRota(dadosparticulardest, destino, origem, horario, horario_chegada);
        var retorno_cargaori = verificaRota(dadoscargaori, origem, destino, horario, horario_chegada);
        var retorno_cargadest = verificaRota(dadoscargadest, destino, origem, horario, horario_chegada);
        //Realiza o espalhamento de todas as altitudes utilizadas
        altitudes_utilizadas = [...retorno_passageirosori[0], ...retorno_passageirosdest[0], 
        ...retorno_particularori[0], ...retorno_particulardest[0],
         ...retorno_cargaori[0], ...retorno_cargadest[0]];
        
        //Caso ainda não tenha nenhuma altitude ocupada vai definir a primeira altitude em 25000
        if ((altitudes_utilizadas.length === 0) && (retorno_cargaori[1] === 0 && retorno_cargadest[1] === 0)){
                arrayplanodevoo = [...classesaeronavecarga.aeronaveCarga.arrayaeronaveCarga];
                arrayplanodevoo.push(25000);
                return arrayplanodevoo;
        }else{
            //define a primeira altitude como 25000
            let dados1 = 25000;
            //Inicializa o bloco de repetição
            let sair = false;
            while (!sair){
                //verifica se a altitude já foi utilizada
                if(altitudes_utilizadas.includes(dados1) === true){
                    dados1 += 1000;
                    if(dados1 > 35000){
                        sair = true;
                    }
                }else{
                    //finaliza o bloco
                    sair = true;
                }

            };
            //verifica se a aeronave está dentro dos limites permitidos de altitude
            if(dados1 > 25000 && dados1 <= 35000){
                //Armazena os dados de cadastro da aeronave
                arrayplanodevoo = [...classesaeronavecarga.aeronaveCarga.arrayaeronaveCarga];
                //adiciona a altitude de voo da aeronave
                arrayplanodevoo.push(dados1);
                return arrayplanodevoo;
            }else{
                //caso todas as altitudes esteja ocupadas
                console.log('\nTodas as altitudes de voo já foram utilizadas\n');
                console.log('Você precisa realizar o seu voo em outro horário');
                console.log('As faixas de altitudes ocupadas são:\n', ...altitudes_utilizadas);
            }
        };
    };
    return arrayplanodevoo;
};

// Função para realizar o cadastro de aerovia de forma automática, assim não sendo necessário passar parâmetro
// por parâmetro
export function cadastro_aerovia(){
    // Termo resposável por iniciar o bloco de repetição 
    let sair = false;
    // Array que armazenará os membros da classe
    let entrada = [];
    // Array com todos as linhas de voo possivel
    const linhas_de_voo = ['POA', 'FLO', 'CWB', 'GRU'];

    while(!sair){

        //Inserindo o ID da aerovia no array de membros
        if (entrada.length === 0){
            let id = prompt(`Digite o id que corresponde a aerovia:`);
            //Adicionando o ID ao array
            entrada.push(id);
        };

        //Inserindo a origem no array de membros
        if (entrada.length === 1){
            //Opções permitidas para o usuário
            console.log('1 - POA\n2 - FLO\n3 - CWB\n4 - GRU');
            //Entrada que determina a origem do voo
            let numero_origem = Number(prompt(`Escolha a origem do voo:`));
            if (numero_origem >= 1 && numero_origem <= 4){
                //Usando o número escolhido para determinar qual índice da lista de voos possíveis armazenar na
                //entrada 
                entrada.push(linhas_de_voo[numero_origem-1]);
            };
        };

        //Inserindo o destino no array de membros
        if (entrada.length === 2){
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
            if ((numero_destino >= 1 && numero_destino <= 4) && entrada.includes
            (linhas_de_voo[numero_destino-1]) === false){
                //Usando o número escolhido para determinar qual índice da lista de voos possíveis armazenar na
                //entrada 
                entrada.push(linhas_de_voo[numero_destino-1]);
            }else{
                //Caso em que o usuário escolhe o destino igual a origem
                if (entrada.includes(linhas_de_voo[numero_destino-1])){
                    console.log(`\nEscolha um destino diferente da origem, a origem escolhida foi\
 ${linhas_de_voo[numero_destino-1]}\n`)
                }else{
                    //Caso em que o usuário não escolhe um número que corresponde as opções dadas
                    console.log(`Você precisa escolher um número entre 1 e 5`)
                }
            };

        };

        //Optei por definir o tamanho da aerovia de forma automatica, assim o usuário não precisa inserir
        // o tamanho de forma manual
        if (entrada.length === 3){
            //Determinei os tamanhos das aerovias mediante uma pesquisa na internet, e vou arrendodar a distância
            //que está na casa dos decimais e são igual ou acima de 0,5 para 1
            // Para cobrir todas as opções de rotas estou avaliando as opções de origem e destino para cada if,
            // pois o tamanho da rota será igual de POA X FLO e FLO x POA
            if (entrada[1] === 'POA' || entrada[2] === 'POA'){
                if(entrada[1] === 'FLO' || entrada[2] === 'FLO'){
                    //Distância original de 375,4
                    //Adicionando a distância ao array de membros
                    entrada.push(375);
                };

                if(entrada[1] === 'CWB' || entrada[2] === 'CWB'){
                    //Distância original de 533
                    //Adicionando a distância ao array de membros
                    entrada.push(533)
                };

                if(entrada[1] === 'GRU' || entrada[2] === 'GRU'){
                    //Distância original de 864
                    //Adicionando a distância ao array de membros
                    entrada.push(864)
                };
            };

            if (entrada[1] === 'FLO' || entrada[2] === 'FLO'){
                if(entrada[1] === 'CWB' || entrada[2] === 'CWB'){
                    //Distância original de 245,45
                    //Adicionando a distância ao array de membros
                    entrada.push(245);
                };

                if (entrada[1] === 'GRU' || entrada[2] === 'GRU'){
                    //Distância original de 515
                    //Adicionando a distância ao array de membros
                    entrada.push(515);
                };
            };

            if (entrada[1] === 'GRU' || entrada[2] === 'GRU'){
                if (entrada[1] === 'CWB' || entrada[2] === 'CWB'){
                    //Distância original de 360
                    //Adicionando a distância ao array de membros
                    entrada.push(360);
                };
            };
            console.log(`O tamanho da rota foi adicionado de forma automatica, sendo o tamanho de\
 ${entrada[entrada.length-1]}`)
            //Distribuindo os membros na classe
            let classe_aerovia = new classesaerovia.aerovia(...entrada);
            //Encerrando o bloco de repetição
            sair = true;
        };
    };
    return entrada;
};

//Função responsável pela exibição das aeronaves cadastradas, sendo possivel exibir todas as aeronaves ou
//escolher um tipo de aeronave específico
export function servico_aeronave(){
    //Inicializa o bloco de repetição
    let sair = false;
    //array com todos os tipos de aeronaves possíveis
    const array_aeronaves = ['aeronave particular', 'aeronave carga', 'aeronave passageiros'];
    //Criação da classe serviço aeronaves
    const exibe_aeronave = new classesservicoaeronaves.servicoAeronaves();
    //Bloco de repetição que possibilida o usuário escolher a opção desejada de exibição
    while (!sair){
        console.log('Escolha a opção de exibição de cadastros de aeronaves que você deseja\n');
        //Listando todas as opções disponíveis para o usuário
        console.log('1 - aeronave particular\n2 - aeronave de carga\n3 - aeronave de passageiros\n4 - todos os\
 tipos\n5 - sair');
        //Numero que corresponde a opção desejada
        let numero_aeronave = Number(prompt('Digite o número correspondente a opção que deseja:'));
        //Caso o usuário tenha escolhido a opção que encerra o bloco de repitação
        if (numero_aeronave === 5){
            //Encerra o bloco de repetição
            sair = true;
            //Ignora todo o codigo escrito abaixo, assim evita eventuais exibições indesejadas
            continue;
        };
        //Verifica se a opção escolhida está dentro da faixa permitida, caso não esteja
        //irá solicitar uma entrada válida nova
        if (numero_aeronave >= 1 && numero_aeronave <= 5){
            //Bloco que exibe apenas um tipo de aeronave específico, e caso não seja a opção escolhida executa
            //a exibição de todos os tipos de aeronaves listados
            if (numero_aeronave != 4){
                exibe_aeronave.todas(array_aeronaves[numero_aeronave-1]);
                let tipo_aeronave = array_aeronaves[numero_aeronave-1];
                tipo_aeronave = tipo_aeronave.replace(/\s/g, '');
                let chave = 'dados' + tipo_aeronave;
                let dados = dadosnoarq(chave);
                console.log(`Dados na memória de ${array_aeronaves[numero_aeronave-1]}:\n`, dados);
            }else{
                //Bloco que vai realizar a exibição de todas os tipos de aeronaves cadastrados
                for (var c = 0; c < array_aeronaves.length; c++){
                    //Exibindo todos os tipos de aeronaves
                    exibe_aeronave.todas(array_aeronaves[c]);
                    let tipo_aeronave = array_aeronaves[c];
                    tipo_aeronave = tipo_aeronave.replace(/\s/g, '');
                    let chave = 'dados' + tipo_aeronave;
                    let dados = dadosnoarq(chave);
                    console.log(`Dados na memória de ${array_aeronaves[c]}:\n`, dados);
                };
            }
            
        }else{
            console.log('\nDigite um número na faixa de 1 a 5\n');
        }
    };
};

//Função que acessa as funções contidas na classe de serviço piloto, sendo elas a de consulta dos dados de
//um piloto com base na sua matricula ou a consulta de todos os pilotos cadastrados
export function servico_pilotos(){
    //Inicializa o bloco de repetição
    let sair = false;
    //termo que verifica se o dados requerido n está na memória do sistema, assim vai verificar nos arquivos
    //texto
    let valido = false;
    //Criação da classe que vai acessar as funções de serviço piloto
    const servico_piloto = new classesservicopilotos.servicoPilotos();
    //bloco de repetição que possibilita escolher as opções desejadas
    while (!sair){
        //Listando as opções disponíveis para o usuário
        console.log('\n1 - consultar um piloto com base na matricula\n2 - consultar o cadastro de todos pilotos\
\n3 - sair')
        //Número da opção que deseja executar
        let numero_piloto = Number(prompt('Digite o número da opção que deseja executar:'));
        //Caso o usuário tenha escolhido o número que corresponde a opção de encerrar o programa
        if (numero_piloto === 3){
            //encerra o bloco de repetição
            sair = true;
            //Ignora todo o codigo que foi escrito abaixo para encerrar o programa
            continue;
        };
        //verifica se a opção escolhida pelo o usuário está na faixa disponível no menu, caso não esteja
        //solicitará uma nova entrada válida
        if (numero_piloto >= 1 && numero_piloto <= 2){
            //executando a função que cosulta o piloto com base na matricula, e executa a opção que
            //exibe todos os pilotos cadastrados no caso de não ter escolhido a opção de consulta
            //por matricula
            if(numero_piloto === 1){
                let matricula_consulta = prompt('Digite a matricula referente ao piloto que deseja consultar:');
                valido = servico_piloto.recupera(matricula_consulta);

                if (valido.length === 0){
                    let dados_pilotos = dadosnoarq('dadospiloto');
                    if (dados_pilotos.length === 0){
                        console.log('A matricula do piloto não consta no banco de dados');
                    }else{
                        for (let i = 0; i < dados_pilotos.length; i++) {
                            let elemento = dados_pilotos[i];
                            // Verifica se o tipo é "aeronave particular"
                            if (elemento.id === matricula_consulta){
                                console.log(elemento);
                                
                            } 
                        };
                    }

                 };
            }else{
                servico_piloto.todos();
                
                
            }

        }else{
            console.log('Você precisa escolher um número entre 1 e 3');
        };
    };
    return valido;
};

//Função que irá realizar as funções contidas na classe de serviço aerovias
export function servico_aerovias(){
    //Inicializa o bloco de repetição
    let sair = false;
    //Array com todas as opções de escolha para origem e destino
    const array_linhas = ['POA', 'FLO', 'CWB', 'GRU'];
    //bloco que irá solicitar a origem e destino, verificar se a origem não é igual o destino e exibir
    //a função da classe serviço aerovias
    while (!sair){
        //Mostra as opções que o usuário possui
        console.log('\n1 - Exibe todas as aerovias como a origem e destino informado\n2 - sair');
        //solicita a escolha da opção desejada
        let numero_aerovia = Number(prompt('Digite o número correspondente a opção desejada:'));
        //Finaliza o bloco de repetição, caso o usuário escolha por essa opção
        if (numero_aerovia === 2){
            //Encerra o bloco while da função
            sair = true;
            //Continue para ignorar e não executar o código que está abaixo
            continue;
        };
        //Verifica se o usuário escolhe uma opção que corresponde as ofertadas, caso não tenha escolhido vai
        //solicitar uma nova entrada
        if (numero_aerovia >= 1 && numero_aerovia <= 2){
            //opções de escolha da origem
            console.log('As opções são:\n1 - POA\n2 - FLO\n3 - CWB\n4 - GRU');
            //solicita a origem
            let numero = Number(prompt('Digite o número de uma opção:'));
            //verifica se a opção de origem está dentro da opções possíveis
            let chave = 'planodevoo' + array_linhas[numero-1];
            if (numero >= 1 && numero <= 4){
                //Exibe novamente o quadro de opções para escolher o destino
                console.log('As opções são:\n1 - POA\n2 - FLO\n3 - CWB\n4 - GRU');
                //Número que corresponde ao destino
                let numero_destino = Number(prompt('Escolha uma opção para o destino:'));
                //Caso o usuário escolha o destino igual a origem, assim evitando erros,
                //e se escolher uma opção valida exibe todas as aerovias que estão listadas com
                //essa origem e destino
                if (numero_destino === numero){
                    console.log('O destino precisa ser diferente da origem');
                }else{
                    //Criando a classe para exibição
                    let consulta_aerovia = new classesservicoaerovias.servicoAerovias(); 
                    //Usando a função da classe para exibir todas as aerovias
                    consulta_aerovia.recupera(array_linhas[numero_destino-1], array_linhas[numero_destino-1]);
                    let dados = dadosnoarq(chave);
                    if (dados.length === 0){
                        console.log('\nA rota escolhida não consta no arquivo')
                    }else{
                        for (var e = 0; e < dados.length; e++){
                            if (dados[e][1] === array_linhas[numero_destino-1] && 
                                dados[e][2] === array_linhas[numero_destino-1]){
                                    console.log('\nDados no arquivo referente a aerovia:\n',dados);
                                };
                        };
                    }
                }

            };

        }else{
            console.log('Você deve escolher uma das opções listadas')
        }
    };
};

//Verifica se já existe dados nos arquivos textos 
export function dadosnoarq(chave) {
    // Recuperar dados existentes
    const dadosExistentetexto = localStorage.getItem(chave);
    //caso não houver dados devolve um array vazio
    let dadosExistente = dadosExistentetexto ? JSON.parse(dadosExistentetexto) : [];
    //devolvendo os dados encontrados
    return dadosExistente;
  };

//realiza a armazenagem de dados novos e dados que já existe no arquivo texto
export function Armazenagem(arraydedados, definatipo, chave){
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

