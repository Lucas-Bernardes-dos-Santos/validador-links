import chalk from "chalk";
import listarLinks from "./index.js";
const argumentos = process.argv;
async function processarArquivo(caminho) {
    let links = await listarLinks(caminho);
    if (links)
        console.log(chalk.green('Lista de links:'), links);
    else
        console.log(chalk.yellow('O Arquivo não possuí links'));
}
processarArquivo(argumentos[2]);
