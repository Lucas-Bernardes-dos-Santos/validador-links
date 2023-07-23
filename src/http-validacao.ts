import { ILinks } from "./interface/ILinks"

export default async function validarListaUrls(listaLinks: ILinks[]) {
  for (const link of listaLinks) {
    link.status = await validarUrl(link.url)
  }
  return listaLinks
}

async function validarUrl(url: string): Promise<string> {
  try {    
    let response: Response = await fetch(url)
    return response.status.toString()
  } catch (error) {
    return tratarErros(error)
  }
}

function tratarErros(erro: any) {
  if (erro.cause.code === 'ENOTFOUND')
    return 'link não encontrado'
  else
    return 'ocorreu algum erro na validação do link'
}