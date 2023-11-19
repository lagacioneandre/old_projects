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
public class Signature {

    @JsonProperty("SignedInfo")
    private SignedInfo SignedInfo;

    @JsonProperty("SignatureValue")
    private String SignatureValue;

    @JsonProperty("KeyInfo")
    private KeyInfo KeyInfo;

}
