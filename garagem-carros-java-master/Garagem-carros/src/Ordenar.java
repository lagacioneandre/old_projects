import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Ordenar {
	public void motosCilindradas(List<Veiculo> listaVeiculos) {
		List<Moto> listaMotos = this.filtrarMotos(listaVeiculos, 1);
		
		Collections.sort(listaMotos);
		
		for (int i = 0; i < listaMotos.size(); i++) {
			Moto moto = listaMotos.get(i);
			
			System.out.println("A moto " + moto.modelo + " tem " + moto.cilindradas + " cilindradas.");
		}
	}
	
	private List<Moto> filtrarMotos(List<Veiculo> listaVeiculos, int tipo) {
		List<Moto> listaMotos = new ArrayList<Moto>();
		
		for (int i = 0; i < listaVeiculos.size(); i++) {
			Veiculo veiculo = listaVeiculos.get(i);
			
			if (veiculo.tipo == tipo) {
				Moto moto = new Moto();
				moto.modelo = veiculo.modelo;
				moto.ano = veiculo.ano;
				moto.placa = veiculo.placa;
				moto.valor = veiculo.valor;
				moto.tipo = veiculo.tipo;
				moto.cilindradas = veiculo.getCilindradas();
				listaMotos.add(moto);
			}
		}
		
		return listaMotos;
	}
	
	public void veiculosAnoDecrescente(List<Veiculo> listaVeiculos) {
		List<FiltroVeiculoAno> listaVeiculosAno = this.filtrarVeiculos(listaVeiculos, 2);
		
		Collections.sort(listaVeiculosAno);
		
		for (int i = 0; i < listaVeiculosAno.size(); i++) {
			FiltroVeiculoAno veiculo = listaVeiculosAno.get(i);
			
			System.out.println("O carro " + veiculo.modelo + " é do ano de " + veiculo.ano + ".");
		}
	}
	
	private List<FiltroVeiculoAno> filtrarVeiculos(List<Veiculo> listaVeiculos, int tipo) {
		List<FiltroVeiculoAno> listaVeiculosAno = new ArrayList<FiltroVeiculoAno>();
		
		for (int i = 0; i < listaVeiculos.size(); i++) {
			Veiculo veiculo = listaVeiculos.get(i);
			
			if (veiculo.tipo == tipo) {
				FiltroVeiculoAno veiculoAno = new FiltroVeiculoAno();
				veiculoAno.modelo = veiculo.modelo;
				veiculoAno.ano = veiculo.ano;
				veiculoAno.placa = veiculo.placa;
				veiculoAno.valor = veiculo.valor;
				veiculoAno.tipo = veiculo.tipo;
				listaVeiculosAno.add(veiculoAno);
			}
		}
		
		return listaVeiculosAno;
	}
	
	public void caminhoesEixos(List<Veiculo> listaVeiculos) {
		List<Caminhao> listaCaminhoes = this.filtrarCaminhoes(listaVeiculos, 3);
		
		Collections.sort(listaCaminhoes);
		
		for (int i = 0; i < listaCaminhoes.size(); i++) {
			Caminhao caminhao = listaCaminhoes.get(i);
			
			System.out.println("O caminhão " + caminhao.modelo + " tem " + caminhao.qtdeEixos + " eixos.");
		}
	}
	
	private List<Caminhao> filtrarCaminhoes(List<Veiculo> listaVeiculos, int tipo) {
		List<Caminhao> listaCaminhoes = new ArrayList<Caminhao>();
		
		for (int i = 0; i < listaVeiculos.size(); i++) {
			Veiculo veiculo = listaVeiculos.get(i);
			
			if (veiculo.tipo == tipo) {
				Caminhao caminhao = new Caminhao();
				caminhao.modelo = veiculo.modelo;
				caminhao.ano = veiculo.ano;
				caminhao.placa = veiculo.placa;
				caminhao.valor = veiculo.valor;
				caminhao.tipo = veiculo.tipo;
				caminhao.qtdeEixos = veiculo.getQtdeEixos();
				listaCaminhoes.add(caminhao);
			}
		}
		
		return listaCaminhoes;
	}
}
