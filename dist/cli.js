import fs from 'fs';
import chalk from "chalk";
import listarLinks from "./index.js";
const argumentos = process.argv;
async function validarLinks(caminho) {
    try {
        fs.lstatSync(caminho);
    }
    catch (error) {
        if (error.code === 'ENOENT')
            console.log(chalk.red('Arquivo ou diretório não encontrado'));
        return;
    }
    if (ehArquivo(caminho)) {
        exibirResultado(await listarLinks(caminho));
    }
    else if (ehDiretorio(caminho)) {
        let arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo, index, array) => {
            let resultado = await listarLinks(`${caminho}/${arquivo}`);
            exibirResultado(resultado, arquivo);
        });
    }
}
function ehArquivo(caminho) {
    return fs.lstatSync(caminho).isFile();
}
function ehDiretorio(caminho) {
    return fs.lstatSync(caminho).isDirectory();
}
function exibirResultado(resultado, arquivo = '') {
    console.log(chalk.yellow('Lista de links:'), chalk.black.bgGreen(arquivo), resultado);
}
validarLinks(argumentos[2]);
