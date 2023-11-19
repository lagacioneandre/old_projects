package previsaotempoapi.cidade;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import javassist.tools.rmi.ObjectNotFoundException;

@Service
public class CidadeService {
	@Autowired
	private CidadeRepository cidadeRepository;
	
	public List<Cidade> findAll() {
		return cidadeRepository.findAll();
	}

	public List<Cidade> findByName(String name) {
		return cidadeRepository.findByNome(name);
	}
	
	public Page<Cidade> findPage(Integer page, Integer size, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), orderBy);
		return cidadeRepository.findAll(pageRequest);
	}
	
	public Cidade find(String id) throws ObjectNotFoundException {
		Optional<Cidade> cidade = cidadeRepository.findById(id);
		return cidade.orElseThrow(() -> new ObjectNotFoundException("Cidade não encontrada!"));
	}
	
	public Cidade insert(Cidade cidade) {
		cidade.setId(null);
		return cidadeRepository.save(cidade);
	}
	
	public void delete(String id) throws ObjectNotFoundException {
		find(id);
		
		try {
			cidadeRepository.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Não é possível remover essa cidade, pois existem registros atrelados a ela!");
		}
	}
	
	public Cidade fromDto(CidadeDTO cidadeDTO) {
		return new Cidade(cidadeDTO.getId(), cidadeDTO.getName(), cidadeDTO.getIdOpenWeather(), cidadeDTO.getCountry());
	}
}
