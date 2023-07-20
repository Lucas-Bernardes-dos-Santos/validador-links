import fs from 'fs';
import chalk from "chalk";
import listarLinks from "./index.js";
const argumentos = process.argv;
async function validarLinks(caminho) {
    if (ehArquivo(caminho)) {
        exibirResultado(await listarLinks(caminho));
    }
    else if (ehDiretorio(caminho)) {
        let arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo, index, array) => {
            let resultado = await listarLinks(`${caminho}/${arquivo}`);
            exibirResultado(resultado);
        });
    }
}
function ehArquivo(caminho) {
    return fs.lstatSync(caminho).isFile();
}
function ehDiretorio(caminho) {
    return fs.lstatSync(caminho).isDirectory();
}
function exibirResultado(resultado) {
    console.log(chalk.yellow('Lista de links:'), resultado);
}
validarLinks(argumentos[2]);
