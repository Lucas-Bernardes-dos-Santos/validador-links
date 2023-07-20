import fs from 'fs'
import chalk from "chalk"
import { ILinks } from './interface/ILinks'

async function listarLinks(caminho: string) {
	let encode: BufferEncoding = 'utf-8'
	try {
		let texto = await fs.promises.readFile(caminho, encode)
		return extrairLinks(texto)
	} catch (error: any) {
		tratarErro(error.message)
	}
}

function extrairLinks(texto: string): ILinks[] | string {
	let regex: RegExp = /\[([^[\]]*?)\]\((https?:\/*[^\s?#.].[^\s]*)\)/gm
	let capturas = [...texto.matchAll(regex)]
	return montarLinks(capturas)
}

function montarLinks(capturas: RegExpMatchArray[]): ILinks[] | string {
	let links: ILinks[] = []

	capturas.forEach(captura => {
		links.push({
			titulo: captura[1],
			url: captura[2]
		})
	})

	return links.length > 0 ? links: 'Não há links no arquivo'
}

function tratarErro(mensagem: string) {
	throw new Error(chalk.red(mensagem))
}

export default listarLinks