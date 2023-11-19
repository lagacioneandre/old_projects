import java.util.Calendar;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Padronizar {
	Scanner scanner = new Scanner(System.in);
	
	public int tipo() {
		System.out.println("Informe um tipo:");
		System.out.println("1 - Motos");
		System.out.println("2 - Carros");
		System.out.println("3 - Caminhões");
		String valor = scanner.next();
		int tipo = this.parseToInt(valor, 0);

		if (tipo <= 0) {
			System.out.println("O tipo informado não é valido!");
			return this.tipo();
		}
		
		return tipo;
	}
	
	public int cilindradas() {
		System.out.println("Informe as cilindradas: ");
		String valor = scanner.next();
		int cilindradas = this.parseToInt(valor, 0);
		
		if (cilindradas <= 0) {
			System.out.println("As cilindradas informadas não são validas!");
			return this.cilindradas();
		}
		
		return cilindradas;
	}
	
	public int ano() {
		Calendar calendar = Calendar.getInstance();
		int anoMaximo = calendar.get(Calendar.YEAR) + 1;
		
		System.out.println("Informe o ano: ");
		String valor = scanner.next();
		int ano = this.parseToInt(valor, 0);
		
		if (ano <= 0 || ano < 1800 || ano > anoMaximo) {
			System.out.println("O ano informado não é valido!");
			return this.ano();
		}
		
		return ano;
	}
	
	public String placa() {
		Pattern regexp = Pattern.compile("[aA-zZ]{3}-[0-9]{4}");
		System.out.println("Informe a placa: ");
		String placa = scanner.next();
		Matcher placaValida = regexp.matcher(placa);
		
		if (!placaValida.find()) {
			System.out.println("A placa informada não é valida!");
			return this.placa();
		}
		
		return placa.toUpperCase();
	}
	
	public double valor() {
		System.out.println("informe o valor: ");
		String valor = scanner.next();
		double valorFinal = this.parseToDouble(valor, 0);
		
		if (valorFinal <= 0) {
			System.out.println("O valor informado não é valido!");
			return this.valor();
		}
		
		return valorFinal;
	}
	
	public int eixos() {
		System.out.println("Informe a quantidade de eixos: ");
		String valor = scanner.next();
		int qtdeEixos = this.parseToInt(valor, 0);
		
		if (qtdeEixos <= 0) {
			System.out.println("A quantidade de eixos informada não é valida!");
			return this.eixos();
		}
		
		return qtdeEixos;
	}
	
	public int opcao(String mensagem) {
		System.out.println(mensagem);
		String valor = scanner.next();
		int opcao = this.parseToInt(valor, 0);
		
		if (opcao <= 0 && opcao > 2) {
			System.out.println("A opção informada não é valida!");
			return this.opcao(mensagem);
		}
		
		return opcao;
	}
	
	public int opcaoInicial() {
		System.out.println("Selecione uma opção: ");
		String valor = scanner.next();
		int opcao = this.parseToInt(valor, 0);
		
		if (opcao <= 0) {
			System.out.println("A opção selecionada não é valida!");
			return this.opcaoInicial();
		}
		
		return opcao;
	}
	
	private int parseToInt(String valor, int base) {
		try {
			return Integer.parseInt(valor);
		} catch (NumberFormatException e) {
			return base;
		}
	}
	
	private double parseToDouble(String valor, double base) {
		try {
			return Double.parseDouble(valor);
		} catch (NumberFormatException e) {
			return base;
		}
	}
}
