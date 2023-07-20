import fs from 'fs'
import chalk from "chalk"
import { ILinks } from './interface/ILinks'

async function lerArquivo(caminho: string) {
	let encode: BufferEncoding = 'utf-8'
	try {
		let texto = await fs.promises.readFile(caminho, encode)
		extrairLinks(texto)
	} catch (error: any) {
		tratarErro(error.message)
	}
}

function extrairLinks(texto: string) {
	let regex: RegExp = /\[([^[\]]*?)\]\((https?:\/*[^\s?#.].[^\s]*)\)/gm
	let capturas = [...texto.matchAll(regex)]
	return montarLinks(capturas)
}

function montarLinks(capturas: RegExpMatchArray[]): ILinks[] {
	let links: ILinks[] = []

	capturas.forEach(captura => {
		links.push({
			titulo: captura[1],
			url: captura[2]
		})
	})

	return links
}

function tratarErro(mensagem: string) {
	throw new Error(chalk.red(mensagem))
}

lerArquivo('./arquivos/texto.md')