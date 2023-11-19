package com.example.xmlmanipulatorapi.manipulateDocument.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "editedDocument")
public class ManipulateDocument {

    @Id
    @JsonProperty
    private String id;

    private String editedDocument;

    public ManipulateDocument(String editedDocument) {
        this.editedDocument = editedDocument;
    }
}
