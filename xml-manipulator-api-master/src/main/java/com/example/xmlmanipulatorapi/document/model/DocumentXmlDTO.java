package com.example.xmlmanipulatorapi.document.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentXmlDTO {

    private String id;
    private String cnpjEmissor;
    private String cidadeEstadoEmissor;
    private String cnpjRemetente;
    private String cidadeEstadoRemetente;
    private String cnpjDestinatario;
    private String cidadeEstadoDestinatario;
    private String chaveAcesso;
    private Long dataEmissao;
    private Boolean edited;

}
