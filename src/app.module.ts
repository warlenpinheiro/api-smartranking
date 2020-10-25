import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:eH9zl7ArLT2q58CZ@cluster0.qvvps.mongodb.net/smartranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    ),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
