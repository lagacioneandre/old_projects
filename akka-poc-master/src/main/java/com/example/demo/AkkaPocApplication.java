package com.example.demo;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.Props;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class AkkaPocApplication {

	public static void main(String[] args) {
		SpringApplication.run(AkkaPocApplication.class, args);

		// Criação de um Actor System, que é o container Akka.
		ActorSystem actorSystem = ActorSystem.create("HelloSystem");

		// Criando o ator EcoActor
		ActorRef ecoActor = actorSystem.actorOf(Props.create(EcoActor.class), "ecoActor");

		// Enviando a mensagem ao ator
		ecoActor.tell(new HelloMessage("Teste de mensagem", new Date()), ActorRef.noSender());
	}

}
