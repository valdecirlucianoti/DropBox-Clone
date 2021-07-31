# Projeto DropBox Clone v1

(https://www.hcode.com.br)

Projeto desenvolvido como exemplo do Curso Completo de JavaScript na Udemy.com.
Link heroku:

Esta aplicação tem como fim treinamento da linguagem Javascript, NODEjs e Firebase.

## Como rodar

### Instalando dependências
Utilizando o gerenciador de pacotes `NPM` execute o seguinte comando:
```
npm install
```
Esta aplicação possui dependências Bower, caso não possua o mesmo instale-o execute em seu terminal o comando:
```
npm install -g bower
```
E em seguida o comando:
```
bower install
```

### Configurando a Base de Dados
Esta aplicação utiliza o `Firebase` para alocar as referencias aos arquivos no servidor.
É necessario o cadastro  no site:
```
www.firebase.google.com
```
Criar um projeto e obter o arquivo `firebaseConfig` e substitua as informações no método `connectFirebase`:
```
var firebaseConfig = {
            apiKey: "*",
            authDomain: "*",
            databaseURL: "*",
            projectId: "*",
            storageBucket: "*",
            messagingSenderId: "*",
            appId: "*",
            measurementId: "*"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();
}

```

Nesta versão da aplicação usei o armazenamento em disco no servido local para salvar os arquivos de upload
```
./upload/
```
O armazenamento dos mesmo em um servidor tem seus lados bons e maus mas segui essas linha por motivos de aprendizagem.
A versão (v2) do projeto tera os arquivos salvos no Firebase assim como suas respectivas referencias.

### Esta aplicação utiliza: 
Javascript, NODEjs, NPM, Bower, Firebase, HTML5, CSS3, SVG e GIT

### Projeto
![DropBox Clone](https://firebasestorage.googleapis.com/v0/b/hcode-com-br.appspot.com/o/DropBoxClone.jpg?alt=media&token=d59cad0c-440d-4516-88f2-da904b9bb443)
