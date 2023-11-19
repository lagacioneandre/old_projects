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
public class EnderEmit {

    @JsonProperty("xLgr")
    private String xLgr;

    @JsonProperty("nro")
    private String nro;

    @JsonProperty("xBairro")
    private String xBairro;

    @JsonProperty("cMun")
    private Integer cMun;

    @JsonProperty("xMun")
    private String xMun;

    @JsonProperty("CEP")
    private Integer CEP;

    @JsonProperty("UF")
    private String UF;

}
