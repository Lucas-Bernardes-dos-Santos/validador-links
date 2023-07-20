import fs from 'fs';
import chalk from "chalk";
async function listarLinks(caminho) {
    let encode = 'utf-8';
    try {
        let texto = await fs.promises.readFile(caminho, encode);
        return extrairLinks(texto);
    }
    catch (error) {
        tratarErro(error.message);
        return null;
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
    return links.length > 0 ? links : 'Não há links no arquivo';
}
function tratarErro(mensagem) {
    throw new Error(chalk.red(mensagem));
}
export default listarLinks;
