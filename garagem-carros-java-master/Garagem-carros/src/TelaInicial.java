import java.util.Scanner;

public class TelaInicial {
	Scanner scanner = new Scanner(System.in);
	Padronizar padronizar = new Padronizar();
	
	public int imprimirTela() {
		System.out.println("1 - Cadastrar veículo.");
		System.out.println("2 - Alterar veículo.");
		System.out.println("3 - Remover veículo.");
		System.out.println("4 - Listar valor total e quantidade de veículos por tipo.");
		System.out.println("5 - Listar Motos ordenadas por cilindrada.");
		System.out.println("6 - Listar Carros ordenados pelo Ano decrescente.");
		System.out.println("7 - Listar Caminhões ordenados pela quantidade de eixos.");
		System.out.println("8 - Listar veículos agrupados por mês de acordo com o prazo de renovação de licenciamento.");
		System.out.println("9 - Salvar e Sair.");
		
		int opcaoInicial = padronizar.opcaoInicial();
		
		return opcaoInicial;
	}
}
