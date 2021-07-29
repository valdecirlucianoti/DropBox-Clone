class DropBoxController{

    constructor(){

        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.inputFilesEl = document.querySelector('#files');
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.nameFileEl = this.snackModalEl.querySelector('.filename');
        this.timeFileEl = this.snackModalEl.querySelector('.timeleft');
        
        this.initEvents();

    }

    initEvents(){

        this.btnSendFileEl.addEventListener('click', event =>{

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event =>{

            this.uploadTask(event.target.files);

            this.modelShow();

            this.inputFilesEl.value = '';

        });
 
    }

    modelShow(show = true){
        this.snackModalEl.style.display = (show) ? 'block' : 'none';
    }


    uploadTask(files){

        let promieses = [];

        [...files].forEach(file =>{

            promieses.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');
                ajax.onload = event => {

                    this.modelShow(false);

                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch (e) {
                        reject(e);
                    }

                };

                ajax.onerror = event =>{

                    this.modelShow(false);
                    reject(event);

                };

                ajax.upload.onprogress = event => {

                    this.uploadProgress(event, file);
                    //console.log(event);

                };

                let formData = new FormData();
                formData.append('input-file', file);

                this.startUploadTime = Date.now();
                ajax.send(formData);
            }));

        });

        //all recebe uma coleção de promessas
        return Promise.all(promieses);
    }

    uploadProgress(event, file){
        let timespend = Date.now() - this.startUploadTime; 
        let loaded = event.loaded;
        let total = event.total;
        let porcent = ((loaded / total) * 100);
        let timeleft = ((100 - porcent) * timespend) / porcent;

        
        this.progressBarEl.style.width = `${porcent}%`;

        this.nameFileEl.innerHTML = file.name;
        this.timeFileEl.innerHTML = this.formatTimeToHuman(timeleft);

    }

    formatTimeToHuman(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0){
            return `${horas} horas, ${minutes} minutos e ${seconds} segundos`;
        }
        if(minutes > 0){
            return `${minutes} minutos e ${seconds} segundos`;
        }
        if(seconds > 0){
            return `${seconds} segundos`;
        }

        return '';
    }
    getFileIconView(file){

        switch (file.type) {
            case 'folder':
                return `
                    <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
                        <title>content-folder-large</title>
                        <g fill="none" fill-rule="evenodd">
                            <path d="M77.955 53h50.04A3.002 3.002 0 0 1 131 56.007v58.988a4.008 4.008 0 0 1-4.003 4.005H39.003A4.002 4.002 0 0 1 35 114.995V45.99c0-2.206 1.79-3.99 3.997-3.99h26.002c1.666 0 3.667 1.166 4.49 2.605l3.341 5.848s1.281 2.544 5.12 2.544l.005.003z" fill="#71B9F4"></path>
                            <path d="M77.955 52h50.04A3.002 3.002 0 0 1 131 55.007v58.988a4.008 4.008 0 0 1-4.003 4.005H39.003A4.002 4.002 0 0 1 35 113.995V44.99c0-2.206 1.79-3.99 3.997-3.99h26.002c1.666 0 3.667 1.166 4.49 2.605l3.341 5.848s1.281 2.544 5.12 2.544l.005.003z" fill="#92CEFF"></path>
                        </g>
                    </svg>
                `;
                break;
                
            case 'folder':
            
                break;
            case 'folder':
        
            break;
            default:
                break;
        }

    }

    getFileView(file){

        return `
            <li>
                ${this.getFileIconView(file)}
                <div class="name text-center">Meus Documentos</div>
            </li>
        `;

    }
}