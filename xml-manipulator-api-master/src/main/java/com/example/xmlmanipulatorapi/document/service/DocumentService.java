package com.example.xmlmanipulatorapi.document.service;

import com.example.xmlmanipulatorapi.commons.exceptions.ObjectNotFoundException;
import com.example.xmlmanipulatorapi.commons.query.BuildQuery;
import com.example.xmlmanipulatorapi.commons.template.BuildMongoTemplate;
import com.example.xmlmanipulatorapi.document.model.*;
import com.example.xmlmanipulatorapi.document.repository.DocumentRepository;
import com.example.xmlmanipulatorapi.manipulateDocument.service.ManipulateDocumentService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ManipulateDocumentService manipulateDocumentService;
    private final BuildMongoTemplate buildMongoTemplate;
    private final BuildQuery buildQuery;

    @Autowired
    public DocumentService(
            DocumentRepository documentRepository,
            ManipulateDocumentService manipulateDocumentService,
            BuildMongoTemplate buildMongoTemplate,
            BuildQuery buildQuery
    ) {
        this.documentRepository = documentRepository;
        this.manipulateDocumentService = manipulateDocumentService;
        this.buildMongoTemplate = buildMongoTemplate;
        this.buildQuery = buildQuery;
    }

    public String readFile(MultipartFile file) throws Exception {

        if (file == null || file.isEmpty()) {
            throw new ObjectNotFoundException("Selecione um arquivo para enviar!");
        }

        try {
            XmlMapper xmlMapper = new XmlMapper();
            String readContent = new String(Files.readAllBytes(Paths.get(file.getOriginalFilename())));
            DocumentXml documentXml = xmlMapper.readValue(readContent, DocumentXml.class);
            this.documentRepository.insert(documentXml);

            JsonNode node = this.manipulateDocumentService.convertStringXmlToJsonNode(readContent);
            String nodeString = this.manipulateDocumentService.convertJsonNodeToString(node);
            String stringDocument = this.manipulateDocumentService.convertStringJsonToStringXml(nodeString);
            return stringDocument;
        } catch (Exception e) {
            throw new Exception("Erro ao processar o arquivo.", e.getCause());
        }

    }

    public List<DocumentXmlDTO> getDocumentos() {
        List<DocumentXml> documentXmlList = this.documentRepository.findAll();
        List<DocumentXmlDTO> documentXmlDTOList = documentXmlList.stream().map(item -> this.mapDocumentsDto(item)).collect(Collectors.toList());
        return documentXmlDTOList;
    }

    private DocumentXmlDTO mapDocumentsDto(DocumentXml documentXml) {
        DocumentXmlDTO documentXmlDTO = new DocumentXmlDTO();

        Emit emit = documentXml.getCteProc().getCTe().getInfCte().getEmit();
        String cidadeEstadoEmissor = emit.getEnderEmit().getXMun() + " - " + emit.getEnderEmit().getUF();

        Rem rem = documentXml.getCteProc().getCTe().getInfCte().getRem();
        String cidadeEstadoRemetente = rem.getEnderReme().getXMun() + " - " + rem.getEnderReme().getUF();

        Dest dest = documentXml.getCteProc().getCTe().getInfCte().getDest();
        String cidadeEstadoDestinatario = dest.getEnderDest().getXMun() + " - " + dest.getEnderDest().getUF();

        documentXmlDTO.setId(documentXml.getId());
        documentXmlDTO.setCnpjEmissor(emit.getCNPJ());
        documentXmlDTO.setCidadeEstadoEmissor(cidadeEstadoEmissor);
        documentXmlDTO.setCnpjRemetente(rem.getCNPJ());
        documentXmlDTO.setCidadeEstadoRemetente(cidadeEstadoRemetente);
        documentXmlDTO.setCnpjDestinatario(dest.getCNPJ());
        documentXmlDTO.setCidadeEstadoDestinatario(cidadeEstadoDestinatario);
        documentXmlDTO.setChaveAcesso(documentXml.getCteProc().getProtCTe().getInfProt().getChCTe());
        documentXmlDTO.setDataEmissao(documentXml.getCteProc().getCTe().getInfCte().getIde().getDhEmi().getTime());
        documentXmlDTO.setEdited(false);
        return documentXmlDTO;
    }

    public void deleteDocument(String documentId) {
        MongoTemplate mongoTemplate = this.buildMongoTemplate.build();
        Query query = this.buildQuery.findById(documentId);
        DocumentXml document = mongoTemplate.findOne(query, DocumentXml.class);

        if (document == null) {
            throw new ObjectNotFoundException("Documento não encontrado");
        }

        mongoTemplate.remove(document);
    }


}
