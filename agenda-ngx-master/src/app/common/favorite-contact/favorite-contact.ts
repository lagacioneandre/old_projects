// services
import { ContatosService } from '../../contacts/services/contatos.service';
import { EmitService } from '../../shared/services/emit.service';

export class FavoriteContact {
    public static Control(contact: object, contatosService: ContatosService, emitService: EmitService) {
        let messageSuccess: string;
        let messageError: string;

        delete contact['isSelected'];
        delete contact['selected'];
        delete contact['showOptions'];

        if (contact['favorito']) {
            contact['favorito'] = false;
            messageSuccess = 'O contato foi desfavoritado com sucesso!';
            messageError = 'Ocorreu algum erro ao desfavoritar o contato!';
        } else {
            contact['favorito'] = true;
            messageSuccess = 'O contato foi favoritado com sucesso!';
            messageError = 'Ocorreu algum erro ao favoritar o contato!';
        }

        contatosService.favoritarContato(contact)
            .then(
                () => emitService.toasterConfig({
                    tipo: 'success',
                    titulo: 'Contato atualizado!',
                    texto: messageSuccess
                }),
                () => emitService.toasterConfig({
                    tipo: 'error',
                    titulo: 'Ooops : (',
                    texto: messageError
                })
            );
    }
}
