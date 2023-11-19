import java.util.List;

public class Pesquisar {
	public int placa(List<Veiculo> listaVeiculos, String placa) {
		int posicao = -1;
		
		for (int i = 0; i < listaVeiculos.size(); i++) {
			Veiculo veiculo = listaVeiculos.get(i);
			
			if  (veiculo.placa.toLowerCase().intern() == placa.toLowerCase().intern()) {
				posicao = i;
				break;
			}
		}
		
		return posicao;
	}
	
	public int totalVeiculosPorTipo(List<Veiculo> listaVeiculos, int tipo) {
		int total = 0;
		
		for (int i = 0; i < listaVeiculos.size(); i++) {
			Veiculo veiculo = listaVeiculos.get(i);
			
			if (veiculo.tipo == tipo) {
				total++;
			}
		}
		
		return total;
	}
	
	public double valorTotalVeiculosPorTipo(List<Veiculo> listaVeiculos, int tipo) {
		double valorTotal = 0;
		
		for (int i = 0; i < listaVeiculos.size(); i++) {
			Veiculo veiculo = listaVeiculos.get(i);
			
			if (veiculo.tipo == tipo) {
				valorTotal += veiculo.valor;
			}
		}
		
		return valorTotal;
	}
}
