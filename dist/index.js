import fs from 'fs';
import chalk from "chalk";
async function lerArquivo(caminho) {
    let encode = 'utf-8';
    try {
        let texto = await fs.promises.readFile(caminho, encode);
        extrairLinks(texto);
    }
    catch (error) {
        tratarErro(error.message);
    }
}
function extrairLinks(texto) {
    let regex = /\[([^[\]]*?)\]\((https?:\/*[^\s?#.].[^\s]*)\)/gm;
    let capturas = [...texto.matchAll(regex)];
    return montarLinks(capturas);
}
function montarLinks(capturas) {
    let links = [];
    capturas.forEach(captura => {
        links.push({
            titulo: captura[1],
            url: captura[2]
        });
    });
    return links;
}
function tratarErro(mensagem) {
    throw new Error(chalk.red(mensagem));
}
lerArquivo('./arquivos/texto.md');
