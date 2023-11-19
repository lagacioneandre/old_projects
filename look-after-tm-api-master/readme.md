# Executar o projeto
- Para executar o projeto é preciso instalar as dependencias do NPM, abrir o terminal na raiz do projeto e rodar o comando npm install.

- Para o projeto rodar precisa ter o MongoDB configurado na máquina, no Mongo criar a base look_after_tm, a conexão do projeto com o Mongo está na rota mongodb://localhost:27017/look_after_tm, então o Mongo precisa estar rodando na porta 27017, essa éa prota padrão.

- Dentro dessa base criar uma collection com o nome de products, e inserir os documentos que representam esses produtos, abaixo está o script para adicionar os produtos, basta executa-lo no terminal do mongo.

- Após isso, com o terminal aberto na raiz do projeto, basta rodar o comando npm start ou nodemon, se tudo ocorrer bem irá aparecer no terminal a mensagem "Application running in port 3001".

# Query MongoDB
db.products.insertMany([{
    "name" : "Product 1",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product1.jpg"
}, {
    "name" : "Product 2",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product2.jpg"
}, {
    "name" : "Product 3",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product3.jpg"
}, {
    "name" : "Product 4",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product4.jpg"
}, {
    "name" : "Product 5",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product4.jpg"
}, {
    "name" : "Product 6",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product6.jpg"
}, {
    "name" : "Product 7",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product7.jpg"
}, {
    "name" : "Product 8",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper dui a leo gravida, sit amet malesuada nulla pharetra. Proin aliquam aliquam quam vitae dapibus.",
    "linkImage" : "product8.jpg"
}])