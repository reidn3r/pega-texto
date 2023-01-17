const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');
const Model = require('../../model/UrlModel');
const zipLocal = require('zip-local'); 

const downloadMiddleware = async(req, res, next) => {
    const { id } = req.params;

    const foundData = await Model.findOne({ url:id });
    if(!foundData) return res.redirect(`/${id}`);

    const data = foundData.content;
    if(data == "") return res.redirect(`/${id}`);

    //cria a pasta download-files
    if(!fs.existsSync(path.join(__dirname, '..', '..', 'download-files'))){
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'download-files'));
    }

    //verifica se o arquivo ja existe. se não, cria o arquivo e joga o conteúdo dentro.
    if(!fs.existsSync(path.join(__dirname, '..', '..', 'download-files', `${id}`))){
        await fsPromises.writeFile(path.join(__dirname, '..', '..', 'download-files', `${id}.txt`), data, 'utf-8');
    }
    else{
        //se sim, atualiza o conteúdo
        const file = fsPromises.readFile(path.join(__dirname, '..', '..', 'download-files', `${id}.txt`), 'utf-8');
        await fsPromises.writeFile(file, data, 'utf-8');
    }
    
    const FILE_DIR = path.join(__dirname, '..', '..', 'download-files', `${id}.txt`);
    req.FILE_DIR = FILE_DIR;
    //res.download(FILE_DIR);

    /*
    zipLocal.sync.zip(FILE_DIR).compress().save(path.join(__dirname, '..', 'download-files', `${id}.zip`));
    req.zipDIR = path.join(__dirname, '..', 'download-files', `${id}.zip`);
    */
    
    next();
}

module.exports = downloadMiddleware;