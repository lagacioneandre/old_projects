import multer from 'multer';
import path from 'path'; // para trabalhar com caminhos relativos

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        // __dirname retorna o diretorio no qual o arquivo se encontra, retorna todo o caminho
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        }
    })
};