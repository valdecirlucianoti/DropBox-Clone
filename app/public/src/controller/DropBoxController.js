class DropBoxController{

    constructor(){

        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.inputFileEl = document.querySelector('#files');
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
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

                    this.uploadProgress(event, file);
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

    uploadProgress(event, file){
       
        let loaded = event.loaded;
        let total = event.total;

        let porcent = ((loaded / total) * 100);

        this.progressBarEl.style.width = `${porcent}%`;

    }
}