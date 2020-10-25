import { Injectable, Logger } from '@nestjs/common';
import { from } from 'rxjs';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
        this.criar(criaJogadorDto);
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
}
