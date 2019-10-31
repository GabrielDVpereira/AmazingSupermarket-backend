const multer = require('multer');
const path = require('path');
module.exports = {
    //como o multer vai armazenar as imagens ou arquivos que o usuário submeter
    storage: multer.diskStorage({
        //path.resolve eu posso informar o caminho sem usar barra, oq serve para path de qqr sistema op
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          cb(null,`${name}-${Date.now()}${ext}`);
        }
    }),

}
