package com.example.xmlmanipulatorapi.manipulateDocument.service;

import com.example.xmlmanipulatorapi.commons.exceptions.ObjectNotFoundException;
import com.example.xmlmanipulatorapi.commons.query.BuildQuery;
import com.example.xmlmanipulatorapi.commons.template.BuildMongoTemplate;
import com.example.xmlmanipulatorapi.document.model.DocumentXml;
import com.example.xmlmanipulatorapi.document.model.DocumentXmlDTO;
import com.example.xmlmanipulatorapi.document.repository.DocumentRepository;
import com.example.xmlmanipulatorapi.manipulateDocument.configuration.property.TagDestinatarioProperty;
import com.example.xmlmanipulatorapi.manipulateDocument.entity.ManipulateDocument;
import com.example.xmlmanipulatorapi.manipulateDocument.model.CustomTagNameModel;
import com.example.xmlmanipulatorapi.manipulateDocument.model.EditDocumentModel;
import com.example.xmlmanipulatorapi.manipulateDocument.repository.ManipulateDocumentRepository;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.IOException;
import java.io.StringWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ManipulateDocumentService {

    private final ManipulateDocumentRepository manipulateDocumentRepository;
    private final DocumentRepository documentRepository;
    private final TagDestinatarioProperty tagDestinatarioProperty;
    private final BuildMongoTemplate buildMongoTemplate;
    private final BuildQuery buildQuery;

    @Autowired
    public ManipulateDocumentService(
            ManipulateDocumentRepository manipulateDocumentRepository,
            DocumentRepository documentRepository,
            TagDestinatarioProperty tagDestinatarioProperty,
            BuildMongoTemplate buildMongoTemplate,
            BuildQuery buildQuery
    ) {
        this.manipulateDocumentRepository = manipulateDocumentRepository;
        this.documentRepository = documentRepository;
        this.tagDestinatarioProperty = tagDestinatarioProperty;
        this.buildMongoTemplate = buildMongoTemplate;
        this.buildQuery = buildQuery;
    }

    public String processarDocumento(MultipartFile file, String nomeTagCriada, String valorTagCriada) throws Exception {

        if (file.isEmpty()) {
            throw new ObjectNotFoundException("Selecione um arquivo para enviar!");
        }

        try {
            Document xml = this.createDocument(file, nomeTagCriada, valorTagCriada);
            String xmlString = this.convertDocumentToString(xml);
            String json = this.convertStringXmlToStringJson(xmlString);

            ManipulateDocument editedDocument = new ManipulateDocument(json);
            this.manipulateDocumentRepository.insert(editedDocument);

            return this.convertStringJsonToStringXml(json);
        } catch (Exception e) {
            throw new Exception("Erro ao processar o arquivo: " + e.getMessage());
        }
    }

    private Document createDocument(MultipartFile file, String nomeTagCriada, String valorTagCriada) throws Exception {
        String fileName = file.getOriginalFilename();
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document xml = db.parse(fileName);
        return this.adicionarNovaTag(xml, nomeTagCriada, valorTagCriada);
    }

    private String convertDocumentToString(Document xml) throws TransformerException {
        DOMSource source = new DOMSource(xml);
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        StringWriter stringWriter = new StringWriter();
        transformer.transform(source, new StreamResult(stringWriter));
        return stringWriter.getBuffer().toString();
    }

    private String convertStringXmlToStringJson(String xml) throws IOException {
        JsonNode node = this.convertStringXmlToJsonNode(xml);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(node);
    }

    public JsonNode convertStringXmlToJsonNode(String xml) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();
        return xmlMapper.readTree(xml.getBytes());
    }

    private Document adicionarNovaTag(Document xml, String nomeTagCriada, String valorTagCriada) throws Exception {
        XPathFactory xpf = XPathFactory.newInstance();
        XPath xPath = xpf.newXPath();

        NodeList nodes = (NodeList) xPath.evaluate("/xml/cteProc/CTe/infCte/dest", xml, XPathConstants.NODESET);
        NodeList nodesIde = (NodeList) xPath.evaluate("/xml/cteProc/CTe/infCte/ide", xml, XPathConstants.NODESET);
        Node node = nodes.item(0);
        Node nodeIde = nodesIde.item(0);

        if ("dest".equals(node.getNodeName())) {
            node = this.removerNodeSeExistir(node, nomeTagCriada);
            node.appendChild(this.createOrUpdateNode(xml, nomeTagCriada, valorTagCriada));
        }

        if ("ide".equals(nodeIde.getNodeName())) {
            String dhEmiValue = this.findNodeDateAndGetHisValue(xml);
            String convertedDate = this.convertDateToTimestamp(dhEmiValue);
            nodeIde = this.removerNodeSeExistir(nodeIde, "dhEmi");
            nodeIde.appendChild(this.createOrUpdateNode(xml, "dhEmi", convertedDate));
        }

        return xml;
    }

    private Node removerNodeSeExistir(Node node, String nomeTagCriada) {
        NodeList children = node.getChildNodes();

        for (int i = 0; i < children.getLength(); i++) {
            Node child = children.item(i);

            if (nomeTagCriada.equals(child.getNodeName())) {
                node.removeChild(child);
            }
        }

        return node;
    }

    public String saveDocumentEdited(EditDocumentModel editDocumentModel) throws Exception {
        String documentId = editDocumentModel.getDocumentId();
        String oldTagName = editDocumentModel.getOldTagName();
        String newTagName = editDocumentModel.getNewTagName();
        String tagValue = editDocumentModel.getTagValue();
        Boolean isEdited = editDocumentModel.getIsEdited();
        String xmlDocument = this.findDocumentById(documentId, isEdited);

        if (xmlDocument == null) {
            throw new ObjectNotFoundException("Documento não encontrado");
        }

        Boolean hasOldTag = oldTagName != null && !oldTagName.isEmpty();
        Boolean hasNewTag = newTagName != null && !newTagName.isEmpty();
        Boolean oldAndNewTagAreEquals = oldTagName.equalsIgnoreCase(newTagName);
        JsonNode jsonDocument = this.convertJsonStringToJsonNode(xmlDocument);
        JsonNode destinatarioNode = this.findNodeDestinatario(jsonDocument);

        if (hasOldTag) {
            if (hasNewTag && !oldAndNewTagAreEquals) {
                destinatarioNode = this.updateTag(destinatarioNode, oldTagName, newTagName, tagValue);
            } else {
                destinatarioNode = this.removeNode(destinatarioNode, oldTagName);
            }
        }

        String newJsonDocument = this.updateDocumentWithNewDest(jsonDocument, destinatarioNode);
        ManipulateDocument editedDocument;

        if (isEdited) {
            editedDocument = new ManipulateDocument(documentId, newJsonDocument);
            this.manipulateDocumentRepository.save(editedDocument);
        } else {
            editedDocument = new ManipulateDocument(newJsonDocument);
            this.manipulateDocumentRepository.insert(editedDocument);
        }

        return this.convertStringJsonToStringXml(newJsonDocument);
    }

    private String findDocumentById(String documentId, Boolean isEdited) throws IOException {
        MongoTemplate mongoTemplate = this.buildMongoTemplate.build();
        Query query = this.buildQuery.findById(documentId);

        if (isEdited) {
            ManipulateDocument document = mongoTemplate.findOne(query, ManipulateDocument.class);
            return document == null ? null : document.getEditedDocument();
        } else {
            DocumentXml document = mongoTemplate.findOne(query, DocumentXml.class);

            if (document == null) {
                throw new ObjectNotFoundException("Documento não encontrado");
            }

            mongoTemplate.remove(document);
            ObjectMapper mapper = new ObjectMapper();
            return document == null ? null : mapper.writeValueAsString(document);
        }
    }

    private JsonNode findNodeDestinatario(JsonNode jsonDocument) {
        return jsonDocument.path("cteProc").path("CTe").path("infCte").path("dest");
    }

    private JsonNode convertJsonStringToJsonNode(String jsonDocument) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonFactory jsonFactory = mapper.getFactory();
        JsonParser jsonParser = jsonFactory.createParser(jsonDocument);
        return mapper.readTree(jsonParser);
    }

    private JsonNode updateTag(JsonNode destinatarioNode, String oldTagName, String newTagName, String tagValue) throws Exception {
        destinatarioNode = this.removeNode(destinatarioNode, oldTagName);
        return this.setNewTag(destinatarioNode, newTagName, tagValue);
    }

    private JsonNode removeNode(JsonNode node, String oldTagName) throws Exception {
        try {
            ObjectNode objectNode = (ObjectNode) node;
            objectNode.remove(oldTagName);
            return (JsonNode) objectNode;
        } catch (Exception e) {
            throw new Exception("A tag informada não foi encontrada no documento!");
        }

    }

    private JsonNode setNewTag(JsonNode node, String newTagName, String tagValue) {
        ObjectNode objectNode = (ObjectNode) node;
        objectNode.put(newTagName, tagValue);
        return (JsonNode) objectNode;
    }

    private String updateDocumentWithNewDest(JsonNode node, JsonNode newDest) throws Exception {
        JsonNode infCteNode = node.path("cteProc").path("CTe").path("infCte");
        JsonNode cteNode = node.path("cteProc").path("CTe");

        infCteNode = this.removeNode(infCteNode, "dest");
        cteNode = this.removeNode(cteNode, "infCte");

        infCteNode = this.updateNode(infCteNode, "dest", newDest);
        cteNode = this.updateNode(cteNode, "infCte", infCteNode);
        node = this.updateNode(node, "CTe", cteNode);

        return this.convertJsonNodeToString(node);
    }

    public String convertJsonNodeToString(JsonNode node) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);
    }

    private JsonNode updateNode(JsonNode nodeToUpdate, String nodeName, JsonNode newNodeValue) {
        ObjectNode objectNode = (ObjectNode) nodeToUpdate;
        objectNode.set(nodeName, newNodeValue);
        return  (JsonNode) objectNode;
    }

    public String convertStringJsonToStringXml(String json) {
        JSONObject jsonObject = new JSONObject(json);
        String xml = "<xml><cteProc versao=\"3.00\" xmlns=\"http://www.portalfiscal.inf.br/cte\">" + XML.toString(jsonObject) + "</cteProc></xml>";
        return xml;
    }

    public List<DocumentXmlDTO> getAllEditedDocument() {
        List<ManipulateDocument> documents = this.manipulateDocumentRepository.findAll();
        if (documents.size() > 0) {
            List<JsonNode> documentsJsonNode = documents.stream().map(item -> {
                JsonNode documentNode = null;
                try {
                    documentNode = this.convertJsonStringToJsonNode(item.getEditedDocument());
                } catch (IOException e) {
                    e.printStackTrace();
                }

                return documentNode;
            }).collect(Collectors.toList());

            return documentsJsonNode.stream().map(item -> this.convertDocumentNodeToDocumentXmlDto(item)).collect(Collectors.toList());
        }

        List<DocumentXmlDTO> documentXmlDTO = new ArrayList<>();

        return documentXmlDTO;
    }

    private DocumentXmlDTO convertDocumentNodeToDocumentXmlDto(JsonNode node) {
        DocumentXmlDTO documentXmlDTO = new DocumentXmlDTO();

        JsonNode infCte = node.path("cteProc").path("CTe").path("infCte");
        JsonNode emit = infCte.path("emit");

        String cidadeEstadoEmissor = emit.path("enderEmit").path("xMun").asText() + " - " + emit.path("enderEmit").path("UF").asText();

        JsonNode rem = infCte.path("rem");
        String cidadeEstadoRemetente = rem.path("enderReme").path("xMun").asText() + " - " + rem.path("enderReme").path("UF").asText();

        JsonNode dest = infCte.path("dest");
        String cidadeEstadoDestinatario = dest.path("enderDest").path("xMun").asText() + " - " + dest.path("enderDest").path("UF").asText();

        documentXmlDTO.setId(node.path("id").asText());
        documentXmlDTO.setCnpjEmissor(emit.path("CNPJ").asText());
        documentXmlDTO.setCidadeEstadoEmissor(cidadeEstadoEmissor);
        documentXmlDTO.setCnpjRemetente(rem.path("CNPJ").asText());
        documentXmlDTO.setCidadeEstadoRemetente(cidadeEstadoRemetente);
        documentXmlDTO.setCnpjDestinatario(dest.path("CNPJ").asText());
        documentXmlDTO.setCidadeEstadoDestinatario(cidadeEstadoDestinatario);
        documentXmlDTO.setChaveAcesso(node.path("cteProc").path("protCTe").path("infProt").path("chCTe").asText());
        documentXmlDTO.setDataEmissao(new Long(infCte.path("ide").path("dhEmi").asText()));
        documentXmlDTO.setEdited(true);
        return documentXmlDTO;
    }

    public CustomTagNameModel findDocumentByIdAndGetTagName(String documentId) throws IOException {
        String document = this.findDocumentById(documentId, true);

        if (document == null) {
            throw new ObjectNotFoundException("Documento não encontrado");
        }

        JsonNode node = this.convertJsonStringToJsonNode(document);
        JsonNode destNode = node.path("cteProc").path("CTe").path("infCte").path("dest");

        Map<String, Object> map = this.convertJsonNodeToMap(destNode);
        List<String> nodeNames = this.getNodeNameInMap(map);

        return new CustomTagNameModel (this.findCustomTag(nodeNames));
    }

    private Map<String, Object> convertJsonNodeToMap(JsonNode destNode) {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(destNode, new TypeReference<Map<String, Object>>(){});
    }

    private List<String> getNodeNameInMap(Map<String, Object> map) {
        List<String> nodeNames = new ArrayList<>();

        for (Map.Entry<String, Object> node : map.entrySet()) {
            nodeNames.add(node.getKey());
        }

        return nodeNames;
    }

    private String findCustomTag(List<String> documentTags) {
        List<String> defaultTags = this.getDefaultTags();
        documentTags.removeAll(defaultTags);
        return documentTags.get(0);
    }

    private List<String> getDefaultTags() {
        List<String> defaultTags = new ArrayList<>();
        String[] defaultTagNames = this.tagDestinatarioProperty.getTagsDefault().split(",");

        for (String tag : defaultTagNames) {
            defaultTags.add(tag);
        }

        return defaultTags;
    }

    private String findNodeDateAndGetHisValue(Document xml) throws TransformerException, IOException {
        String xmlString = this.convertDocumentToString(xml);
        JsonNode xmlNode = this.convertStringXmlToJsonNode(xmlString);
        return xmlNode.path("cteProc").path("CTe").path("infCte").path("ide").path("dhEmi").asText();
    }

    private String convertDateToTimestamp(String date) throws ParseException {
        String[] splitDate = date.split("T");
        String[] splitHour = splitDate[1].split("-");

        String pattern = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        Long timestamp = formatter.parse(splitDate[0] + " " + splitHour[0]).getTime();
        return timestamp.toString();
    }

    private Element createOrUpdateNode(Document xml, String nomeTagCriada, String valorTagCriada) {
        Element newNode = xml.createElement(nomeTagCriada);
        newNode.appendChild(xml.createTextNode(valorTagCriada));
        return newNode;
    }

    public void deleteDocument(String documentId) {
        MongoTemplate mongoTemplate = this.buildMongoTemplate.build();
        Query query = this.buildQuery.findById(documentId);
        ManipulateDocument document = mongoTemplate.findOne(query, ManipulateDocument.class);

        if (document == null) {
            throw new ObjectNotFoundException("Documento não encontrado");
        }

        mongoTemplate.remove(document);
    }

}
