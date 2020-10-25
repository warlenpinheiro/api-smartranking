import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { from } from 'rxjs';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criaJogadorDto;
        const jogadorEncontrado = await this.jogadores.find( jogador => jogador.email === email);

        if(jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criaJogadorDto);
        } else {
            this.criar(criaJogadorDto);
        }
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadores.find( jogador => jogador.email === email);

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<void> {

        const jogadorEncontrado = await this.jogadores.find( jogador => jogador.email === email);

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        this.jogadores = this.jogadores.filter( jogador => jogador.email !== jogadorEncontrado.email);
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criaJogadorDto;

        const jogador: Jogador = {
            _id: uuid4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: "www.google.com.br/foto123.jpg"
        };
        this.jogadores.push(jogador);
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    }

    private atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): void {
        const { nome } = criaJogadorDto;

        jogadorEncontrado.nome = nome;
    }
}
