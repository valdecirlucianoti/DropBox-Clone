class DropBoxController{

    constructor(){

        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.inputFileEl = document.querySelector('#files');
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.initEvents();

    }

    initEvents(){

        this.btnSendFileEl.addEventListener('click', event =>{

            this.inputFileEl.click();

        });

        this.inputFileEl.addEventListener('change', event =>{

            this.uploadTask(event.target.files);

            this.snackModalEl.style.display = 'block';

        });

    }

    uploadTask(files){

        let promieses = [];

        [...files].forEach(file =>{

            promieses.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');
                ajax.onload = event => {

                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch (e) {
                        reject(e);
                    }

                };

                ajax.onerror = event =>{
                    reject(event);
                };

                ajax.upload.onprogress = event => {

                    console.log(event);

                };

                let formData = new FormData();
                formData.append('input-file', file);
                ajax.send(formData);
            }));

        });

        //all recebe uma coleção de promessas
        return Promise.all(promieses);
    }
}