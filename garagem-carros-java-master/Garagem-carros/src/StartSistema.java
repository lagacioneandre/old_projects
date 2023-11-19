import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StartSistema {
	ManipularTxt manipular = new ManipularTxt();
	private List<Veiculo> listaVeiculos = new ArrayList<Veiculo>();
	Scanner scanner = new Scanner(System.in);
	int controleLeitura = 0;
	
	public void start() {
		if (controleLeitura == 0) {
			this.buscarVeiculos();
		}
		
		TelaInicial tela = new TelaInicial();
		this.mapearOpcoes(tela.imprimirTela());
	}
	
	public void buscarVeiculos() {
		try {
			listaVeiculos = manipular.ler();
			controleLeitura++;
		} catch(IOException e) {
			e.printStackTrace();
			System.out.println("Erro ao ler o arquivo com as informações!");
		}
	}
	
	public void mapearOpcoes(int opcaoSelecionada) {
		switch(opcaoSelecionada) {
		 	case 1:
		 		CadastrarVeiculo cadastrarNovo = new CadastrarVeiculo();
		 		listaVeiculos = cadastrarNovo.cadastrar(listaVeiculos);
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		this.start();
		 		break;
		 		
		 	case 2:
		 		AlterarVeiculo alterarVeiculo = new AlterarVeiculo();
		 		listaVeiculos = alterarVeiculo.alterar(listaVeiculos);
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		this.start();
		 		break;
		 		
		 	case 3:
		 		Excluir excluir = new Excluir();
		 		listaVeiculos = excluir.veiculo(listaVeiculos);
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		this.start();
		 		break;
		 		
		 	case 4:
		 		Pesquisar pesquisar = new Pesquisar();
		 		
		 		int totalMotos = pesquisar.totalVeiculosPorTipo(listaVeiculos, 1);
		 		double valorTotalMotos = pesquisar.valorTotalVeiculosPorTipo(listaVeiculos, 1);
		 		
		 		int totalCarros = pesquisar.totalVeiculosPorTipo(listaVeiculos, 2);
		 		double valorTotalCarros = pesquisar.valorTotalVeiculosPorTipo(listaVeiculos, 2);
		 		
		 		int totalCaminhoes = pesquisar.totalVeiculosPorTipo(listaVeiculos, 3);
		 		double valorTotalCaminhoes = pesquisar.valorTotalVeiculosPorTipo(listaVeiculos, 3);
		 		
		 		System.out.println("\n");
		 		System.out.println("A quantida de total de motos é: " + totalMotos);
		 		System.out.println("O valor total de todas as motos é: " + valorTotalMotos);
		 		
		 		System.out.println("\n");
		 		System.out.println("A quantidade total de carros é: " + totalCarros);
		 		System.out.println("o valor total de todos os carros é: " + valorTotalCarros);
		 		
		 		System.out.println("\n");
		 		System.out.println("A quantidade total de caminhões é: " + totalCaminhoes);
		 		System.out.println("O valor total de todos os caminhões é: " + valorTotalCaminhoes);
		 		
		 		System.out.println("\n");
		 		System.out.println("Pressione qualquer tecla para continuar.");
		 		String continuarOpcao4 = scanner.next();
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		if (continuarOpcao4 != "") {
		 			this.start();
		 		}
		 		
		 		break;
		 		
		 	case 5:
		 		System.out.println("Listar Motos ordenadas por cilindrada");
		 		Ordenar ordenarMotos = new Ordenar();
		 		
		 		ordenarMotos.motosCilindradas(listaVeiculos);
		 		
		 		System.out.println("\n");
		 		System.out.println("Pressione qualquer tecla para continuar.");
		 		String continuarOpcao5 = scanner.next();
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		if (continuarOpcao5 != "") {
		 			this.start();
		 		}
		 		
		 		break;
		 		
		 	case 6:
		 		System.out.println("Listar Carros ordenados pelo Ano decrescente");
		 		Ordenar ordenarCarrosAno = new Ordenar();
		 		
		 		ordenarCarrosAno.veiculosAnoDecrescente(listaVeiculos);
		 		
		 		System.out.println("\n");
		 		System.out.println("Pressione qualquer tecla para continuar.");
		 		String continuarOpcao6 = scanner.next();
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		if (continuarOpcao6 != "") {
		 			this.start();
		 		}
		 		
		 		break;
		 		
		 	case 7:
		 		System.out.println("Listar Caminhões ordenados pela quantidade de eixos");
		 		Ordenar ordenarCaminhoesEixo = new Ordenar();
		 		
		 		ordenarCaminhoesEixo.caminhoesEixos(listaVeiculos);
		 		
		 		System.out.println("\n");
		 		System.out.println("Pressione qualquer tecla para continuar.");
		 		String continuarOpcao7 = scanner.next();
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		if (continuarOpcao7 != "") {
		 			this.start();
		 		}
		 		
		 		break;
		 		
		 	case 8:
		 		System.out.println("Listar veículos agrupados por mês de acordo com o prazo de renovação de licenciamento");
		 		MapearLicenciamento licenciamento = new MapearLicenciamento();
		 		
		 		licenciamento.mapear(listaVeiculos);
		 		
		 		System.out.println("\n");
		 		System.out.println("Pressione qualquer tecla para continuar.");
		 		String continuarOpcao8 = scanner.next();
		 		
		 		System.out.println("\n ================================================== \n");
		 		
		 		if (continuarOpcao8 != "") {
		 			this.start();
		 		}
		 		
		 		break;
		 		
		 	case 9:
		 		try {
		 			manipular.gravar(listaVeiculos);
		 			controleLeitura = 0;
				} catch (IOException e) {
					e.printStackTrace();
					System.out.println("Houve algum erro ao salvar, por favor tente novamente em alguns instantes!");
					this.start();
				}
		 		
		 		break;
		 }
	}
}
