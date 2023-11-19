import java.util.List;
import java.util.Scanner;

public class CadastrarVeiculo {
	Scanner scanner = new Scanner(System.in);
	private Padronizar padronizar = new Padronizar();
	private Pesquisar pesquisar = new Pesquisar();
	
	public List<Veiculo> cadastrar(List<Veiculo> listaVeiculos) {
		int tipo = padronizar.tipo();
		
		if (tipo == 1) {
			listaVeiculos.add(this.moto(tipo, listaVeiculos));
		} else if (tipo == 2) {
			listaVeiculos.add(this.carro(tipo,  listaVeiculos));
		} else if (tipo == 3) {
			listaVeiculos.add(this.caminhao(tipo,  listaVeiculos));
		}
		
		int opcao = padronizar.opcao("Veículo cadastrado com sucesso, deseja cadastrar outro? 1- Sim | 2 - Não");
		
		if (opcao == 1) {
			return this.cadastrar(listaVeiculos);
		}
		
		return listaVeiculos;
	}
	
	private Veiculo moto(int tipo, List<Veiculo> listaVeiculos) {
		System.out.println("Modelo: ");
		String modelo = scanner.next();
		
		int cilindradas = padronizar.cilindradas();
		int ano = padronizar.ano();
		String placa = this.pedirPlaca(listaVeiculos);
		double valor = padronizar.valor();
		
		Moto moto = new Moto();
		moto.modelo = modelo;
		moto.ano = ano;
		moto.placa = placa;
		moto.valor = valor;
		moto.tipo = tipo;
		moto.cilindradas = cilindradas;
		
		return moto;
	}
	
	private Veiculo carro(int tipo, List<Veiculo> listaVeiculos) {
		System.out.println("Modelo: ");
		String modelo = scanner.next();
		
		int ano = padronizar.ano();
		String placa = this.pedirPlaca(listaVeiculos);
		double valor = padronizar.valor();
		
		Veiculo veiculo = new Veiculo();
		veiculo.modelo = modelo;
		veiculo.ano = ano;
		veiculo.placa = placa;
		veiculo.valor = valor;
		veiculo.tipo = tipo;
		
		return veiculo;
	}
	
	private Veiculo caminhao(int tipo, List<Veiculo> listaVeiculos) {
		System.out.println("Modelo: ");
		String modelo = scanner.next();
		
		int qtdeEixos= padronizar.eixos();
		int ano = padronizar.ano();
		String placa = this.pedirPlaca(listaVeiculos);
		double valor = padronizar.valor();
		
		Caminhao caminhao = new Caminhao();
		caminhao.modelo = modelo;
		caminhao.ano = ano;
		caminhao.placa = placa;
		caminhao.valor = valor;
		caminhao.tipo = tipo;
		caminhao.qtdeEixos = qtdeEixos;
		
		return caminhao;
	}
	
	private String pedirPlaca(List<Veiculo> listaVeiculos) {
		String placa = padronizar.placa();
		int placaExiste = pesquisar.placa(listaVeiculos, placa);
		
		if (placaExiste != -1) {
			System.out.println("Essa placa já está cadastrada para outro veículo!!");
			return this.pedirPlaca(listaVeiculos);
		}
		
		return placa;
	}

}
