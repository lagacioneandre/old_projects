# Iniciar o projeto

1- Rodar o comando yarn com o terminal aberto na raz do projeto\
2- Criar uma ase de dados com as seguintes configurações:
- user: 'postgres',
- host: 'localhost',
- database: 'elecctro_todo_list',
- password: 'docker',
- port: 5432,

3- Rodar o comando yarn start com o terminal aberto na raiz do projeto, deverá aparecer a mensagem "Server runing on http://localhost:3333" \
4- Subir a aplicação front-end ou testar as rotas via Postman ou Insomnia.

# Rotas
## Criar task
Metódo: POST\
Uri: /tasks\
Body: {\
	"description": "Task 1"\
}\
Retorno: {\
  "id": "df3d920f-76c5-47fd-9187-fbb6f3b832bc",\
  "state": "INCOMPLETE",\
  "description": "Task 1",\
  "created_at": "2021-06-09T23:02:03.199Z",\
  "completed_at": null\
}

## Listar tasks
Metódo: GET\
Uri: /tasks\
query: ?orderBy=DESCRIPTION_DESC&filterBy=INCOMPLETE\
Retorno: {
  "id": "df3d920f-76c5-47fd-9187-fbb6f3b832bc",\
  "state": "INCOMPLETE",\
  "description": "Task 1",\
  "created_at": "2021-06-09T23:02:03.199Z",\
  "completed_at": null\
}

## Atualizar tasks
Metódo: PATCH\
Uri: /tasks/{id}\
body: {\
    "state": "COMPLETE",\
    "description": "Task 1 Editada"\
}\
Retorno: {\
  "message": "Task updated."\
}

## Deletar tasks
Metódo: DELETE\
Uri: /tasks/{id}\
Retorno: {\
  "message": "Task deleted."\
}
