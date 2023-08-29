Problemas encontrados:

- No POST /users estava salvando a senha no lugar do email
  - Solução: Utilizar um objeto na criação do construtor para evitar passar parametros na ordem errada.
- No método findWithLogs não estava buscando por userId
  - Solução: Colocar o id no where utilizando o ORM Prisma
- Definir os métodos na interface a ser implementada, pois estava faltando os métodos statusToIntegrate e updateIntegrateWithCrm
- Performance na integração pois o método estava buscando a base inteira que tinha a coluna hasToIntegrate igual a true.

  - Solução:

    - Passar a quantidade no método statusToIntegrate e buscar utilizando LIMIT.
    - Mudar o for await para utilizar Promise.all executando várias tarefas de forma assíncrona, pois não importa a ordem que elas terminam, utilizando concorrencia.

  - A implementar:
    - Poderia utilizar uma arquitetura orientada a serviço, utilizando mensageria como RabbitMQ, Kafka ou algum outro para fazer a integração com o serviço terceiro e posteriormente salvar o status da integração.
