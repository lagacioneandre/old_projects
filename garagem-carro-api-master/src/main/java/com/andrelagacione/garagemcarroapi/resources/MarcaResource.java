package com.andrelagacione.garagemcarroapi.resources;

import com.andrelagacione.garagemcarroapi.domain.Marca;
import com.andrelagacione.garagemcarroapi.dto.MarcaDTO;
import com.andrelagacione.garagemcarroapi.dto.PadraoMensagemRetorno;
import com.andrelagacione.garagemcarroapi.services.MarcaService;
import javassist.tools.rmi.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value="/marcas")
public class MarcaResource {
	@Autowired
	private MarcaService marcaService;
	
	@RequestMapping(value="/lista", method=RequestMethod.GET)
	public ResponseEntity<List<MarcaDTO>> findAll() {
		return ResponseEntity.ok().body(this.marcaService.findAll());
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<Page<MarcaDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page,
			@RequestParam(value="size", defaultValue="25") Integer size,
			@RequestParam(value="ordrBy", defaultValue="nome") String orderBy,
			@RequestParam(value="direction", defaultValue="ASC") String direction
	) {
		return ResponseEntity.ok().body(this.marcaService.findPage(page, size, direction, orderBy));
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Marca> find(@PathVariable Integer id) throws ObjectNotFoundException {
		return ResponseEntity.ok().body(this.marcaService.find(id));
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<PadraoMensagemRetorno> insert(@Valid @RequestBody MarcaDTO marcaDTO) {
		Marca marca = this.marcaService.salvarDados(marcaDTO, true);
		PadraoMensagemRetorno mensagemRetorno = new PadraoMensagemRetorno(HttpStatus.CREATED, HttpStatus.valueOf("CREATED").value(), "Marca criada com sucesso!");

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
					.path("/{id}").buildAndExpand(marca.getId()).toUri();

		return ResponseEntity.created(uri).body(mensagemRetorno);
	}
	
	@RequestMapping(method=RequestMethod.PUT)
	public ResponseEntity<PadraoMensagemRetorno> update(
			@Valid @RequestBody MarcaDTO marcaDTO
	) throws ObjectNotFoundException {
		this.marcaService.salvarDados(marcaDTO, false);
		PadraoMensagemRetorno mensagemRetorno = new PadraoMensagemRetorno(HttpStatus.OK, HttpStatus.valueOf("OK").value(), "Marca editada com sucesso!");
		return ResponseEntity.ok().body(mensagemRetorno);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<PadraoMensagemRetorno> delete(@PathVariable Integer id) throws ObjectNotFoundException {
		this.marcaService.delete(id);
		PadraoMensagemRetorno mensagemRetorno = new PadraoMensagemRetorno(HttpStatus.OK, HttpStatus.valueOf("OK").value(), "Marca removida com sucesso!");
		return ResponseEntity.ok().body(mensagemRetorno);
	}

}
