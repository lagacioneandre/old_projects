package com.example.xmlmanipulatorapi.document.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InfCte {

    @JsonProperty("ide")
    private Ide ide;

    @JsonProperty("compl")
    private Compl compl;

    @JsonProperty("emit")
    private Emit emit;

    @JsonProperty("rem")
    private Rem rem;

    @JsonProperty("dest")
    private Dest dest;

    @JsonProperty("vPrest")
    private VPrest vPrest;

    @JsonProperty("imp")
    private Imp imp;

    @JsonProperty("infCTeNorm")
    private InfCTeNorm infCTeNorm;

    @JsonProperty("autXML")
    private AutXML autXML;

    @JsonProperty("infRespTec")
    private InfRespTec infRespTec;

}
