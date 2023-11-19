import java.util.Scanner;

public class TelaInicial {
	Scanner scanner = new Scanner(System.in);
	Padronizar padronizar = new Padronizar();
	
	public int imprimirTela() {
		System.out.println("1 - Cadastrar ve�culo.");
		System.out.println("2 - Alterar ve�culo.");
		System.out.println("3 - Remover ve�culo.");
		System.out.println("4 - Listar valor total e quantidade de ve�culos por tipo.");
		System.out.println("5 - Listar Motos ordenadas por cilindrada.");
		System.out.println("6 - Listar Carros ordenados pelo Ano decrescente.");
		System.out.println("7 - Listar Caminh�es ordenados pela quantidade de eixos.");
		System.out.println("8 - Listar ve�culos agrupados por m�s de acordo com o prazo de renova��o de licenciamento.");
		System.out.println("9 - Salvar e Sair.");
		
		int opcaoInicial = padronizar.opcaoInicial();
		
		return opcaoInicial;
	}
}
