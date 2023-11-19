package com.example.xmlmanipulatorapi.manipulateDocument.repository;

import com.example.xmlmanipulatorapi.manipulateDocument.entity.ManipulateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ManipulateDocumentRepository extends MongoRepository<ManipulateDocument, Integer> {

}
