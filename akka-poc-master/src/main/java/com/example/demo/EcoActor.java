package com.example.demo;

import akka.actor.*;
import akka.event.Logging;
import akka.event.LoggingAdapter;
import akka.japi.Function;
import scala.concurrent.duration.Duration;

public class EcoActor extends UntypedAbstractActor {

    LoggingAdapter log = Logging.getLogger(getContext().system(), this);

    // Declaramos o ator filho como atributo de EcoActor
    private ActorRef childActor;

    @Override
    public void preStart() throws Exception {
        // Na inicialização do ator, instanciamos o ator filho
        childActor = getContext().actorOf(Props.create(ChildActor.class), "ChildOfEco");
    }

    @Override
    public void onReceive(Object msg) throws Exception {
        if (msg instanceof HelloMessage) {
            log.info("Mensagem recebida: " + msg);

            // Repassamos a mensagem recebida para o ator filho
            childActor.tell(msg, getSelf());
        } else {
            unhandled(msg);
        }
    }

    @Override
    public SupervisorStrategy supervisorStrategy() {
        return new OneForOneStrategy(-1, Duration.Inf(), new Function<Throwable, SupervisorStrategy.Directive>() {
            @Override
            public SupervisorStrategy.Directive apply(Throwable param) throws Exception {
                return OneForOneStrategy.resume();
            }
        });
    }

}
