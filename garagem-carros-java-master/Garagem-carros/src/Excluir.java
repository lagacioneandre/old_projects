import java.util.List;
import java.util.Scanner;

public class Excluir {
	Scanner scanner = new Scanner(System.in);
	Padronizar padronizar = new Padronizar();
	
	public List<Veiculo> veiculo(List<Veiculo> listaVeiculos) {
		String placa = padronizar.placa(); 
		Pesquisar pesquisar = new Pesquisar();
		int indicePlaca = pesquisar.placa(listaVeiculos, placa);
		
		if (indicePlaca != -1) {
			Veiculo veiculo = listaVeiculos.get(indicePlaca);
			
			int confirmar = padronizar.opcao("Você tem certeza que deseja excluir o veículo " + veiculo.modelo + ". 1 - Sim | 2- Não.");
			
			if (confirmar == 1) {
				listaVeiculos.remove(indicePlaca);
				int remover = padronizar.opcao("Veículo removido com sucesso. 1 - Remover outro veículo | 2 - Voltar ao menu.");
				
				if (remover == 1) {
					return this.veiculo(listaVeiculos);
				}
			}
		} else {
			int retornar = padronizar.opcao("Placa não encontrada. 1 - Pesquisar outra placa | 2 - Voltar ao menu.");
			
			if (retornar == 1) {
				return this.veiculo(listaVeiculos);
			}
		}
		
		return listaVeiculos;
	}
}
