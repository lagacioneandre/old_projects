package com.example.demo;

import akka.actor.UntypedAbstractActor;
import akka.event.Logging;
import akka.event.LoggingAdapter;

public class ChildActor extends UntypedAbstractActor {

    LoggingAdapter log = Logging.getLogger(getContext().system(), this);

    @Override
    public void onReceive(Object msg) throws Exception {
        if (msg instanceof HelloMessage) {
            HelloMessage helloMessage = (HelloMessage) msg;
            log.info("Mensagem recebida no ActorChild: " + helloMessage.getMessage() + ", data: " + helloMessage.getDate());
        } else {
            unhandled(msg);
        }
    }

}
