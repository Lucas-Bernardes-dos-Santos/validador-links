export default async function validarListaUrls(listaLinks) {
    for (const link of listaLinks) {
        link.status = await validarUrl(link.url);
    }
    return listaLinks;
}
async function validarUrl(url) {
    try {
        let response = await fetch(url);
        return response.status.toString();
    }
    catch (error) {
        return tratarErros(error);
    }
}
function tratarErros(erro) {
    if (erro.cause.code === 'ENOTFOUND')
        return 'link não encontrado';
    else
        return 'ocorreu algum erro na validação do link';
}
