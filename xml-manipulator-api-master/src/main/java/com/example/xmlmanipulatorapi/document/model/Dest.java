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
public class Dest {

    @JsonProperty("CNPJ")
    private String CNPJ;

    @JsonProperty("IE")
    private Integer IE;

    @JsonProperty("xNome")
    private String xNome;

    @JsonProperty("enderDest")
    private EnderDest enderDest;

}
