export class ExportContacts {
    public static CsvGenerate(contacts: Array<object>) {
        const archiveName = this.buildName();
        const csvContent = this.buildArchive(contacts);
        this.downloadArchive(archiveName, csvContent);
    }

    private static buildName(): string {
        const tempoAtual = new Date();
        let day: any = tempoAtual.getDate();
        let month: any = tempoAtual.getMonth() + 1;
        const year: any = tempoAtual.getFullYear();
        let hour: any = tempoAtual.getHours();
        let minute: any = tempoAtual.getMinutes();
        let second: any = tempoAtual.getSeconds();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;

        return 'My contacts in' + ' ' + day + '-' + month + '-' + year + ' - ' + hour + '-' + minute + '-' + second + '.csv';
    }

    private static buildArchive(contacts: Array<object>): string {
        let content = 'Nome; Descrição; E-mail; Favorito; Marcador; Telefone';

        for (let item of contacts) {
            const isFavorite = item['favorito'] ? 'Sim' : 'Não';
            let details: string;

            details = item['nomeContato'] + ';' + item['descricaoContato'] + ';';
            details += item['emailContato'] + ';' + isFavorite + ';';
            details += item['marcador'] + ';' + item['telefoneContato'] + ';';

            content += '\r\n' + details;
        }

        return content;
    }

    private static downloadArchive(archiveName, csvContent) {
        const blob = new Blob(['\ufeff', csvContent]);

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, archiveName);
        } else {
            let encodedUri = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('download', archiveName);
            document.body.appendChild(link);
            link.setAttribute('href', encodedUri);
            link.click();
            document.body.removeChild(link);
        }
    }
}
