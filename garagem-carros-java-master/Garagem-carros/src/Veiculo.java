
public class Veiculo {
	public String modelo;
	public int ano;
	public String placa;
	public double valor;
	public int tipo;
	
	public int getCilindradas() {
		Moto moto = new Moto();
		return moto.getCilindradas();
	}
	
	public int getQtdeEixos() {
		Caminhao caminhao = new Caminhao();
		return caminhao.getQtdeEixos();
	}
}
