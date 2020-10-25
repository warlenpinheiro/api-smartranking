import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

@Injectable()
export class JogadoresService {
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

    async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criaJogadorDto;
        
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado) {
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`);
        } 

        const jogadorCriado = new this.jogadorModel(criaJogadorDto);
        return await jogadorCriado.save();

    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

        this.verificaExistencia(_id);

        await this.jogadorModel.findOneAndUpdate(
            {_id}, 
            {$set: atualizarJogadorDto}
        ).exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }

        return jogadorEncontrado;
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {

        const jogadorEncontrado = this.verificaExistencia(_id);

        return jogadorEncontrado;
    }

    async deletarJogador(_id: string): Promise<any> {

        this.verificaExistencia(_id);

        return await this.jogadorModel.deleteOne({_id}).exec();
    }

    private async verificaExistencia(_id): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return jogadorEncontrado;
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }
}
