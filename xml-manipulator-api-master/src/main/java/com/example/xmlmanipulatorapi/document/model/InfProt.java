package com.example.xmlmanipulatorapi.document.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InfProt {

    @JsonProperty("tpAmb")
    private Integer tpAmb;

    @JsonProperty("verAplic")
    private String verAplic;

    @JsonProperty("chCTe")
    private String chCTe;

    @JsonProperty("dhRecbto")
    private Date dhRecbto;

    @JsonProperty("nProt")
    private String nProt;

    @JsonProperty("digVal")
    private String digVal;

    @JsonProperty("cStat")
    private Integer cStat;

    @JsonProperty("xMotivo")
    private String xMotivo;

}
