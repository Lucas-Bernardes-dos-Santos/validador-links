import fs from 'fs'
import chalk from "chalk"
import listarLinks from "./index.js"
import validarUrls from './http-validacao.js'

const argumentos = process.argv

async function validarLinks(caminho: string, valida: string) {
	if(!validarCaminhos(caminho)) return

	if (ehArquivo(caminho)) {
		exibirResultado(await listarLinks(caminho), verificarValidacao(valida))
	} 
	else if (ehDiretorio(caminho)) {
		let arquivos = await fs.promises.readdir(caminho)
		arquivos.forEach(async (arquivo: string) => {
			let resultado = await listarLinks(`${caminho}/${arquivo}`)
			exibirResultado(resultado, verificarValidacao(valida), arquivo)
		})
	}
}

function ehArquivo(caminho: string): boolean {
	return fs.lstatSync(caminho).isFile()
}

function ehDiretorio(caminho: string): boolean {
	return fs.lstatSync(caminho).isDirectory()
}
 
function verificarValidacao(valida: string): boolean {
	return valida === 'valida'
}

async function exibirResultado(resultado: any, valida: boolean, arquivo: string = '') {
	if (valida) {
		console.log(
			chalk.yellow('Lista de links:'),
			chalk.black.bgGreen(arquivo),
			await validarUrls(resultado)
		)
	}
	else {
		console.log(
			chalk.yellow('Lista de links:'),
			chalk.black.bgGreen(arquivo),
			resultado
		)
	}
}

function validarCaminhos(caminho:string): boolean {
	try {
		fs.lstatSync(caminho)
		return true
	} catch (error: any) {
		if (error.code === 'ENOENT')
			console.log(chalk.red('Arquivo ou diretório não encontrado'))
			return false
	}
}

validarLinks(argumentos[2], argumentos[3])