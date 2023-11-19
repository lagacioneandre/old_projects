
public class Caminhao extends Veiculo implements Comparable<Caminhao> {
	public int qtdeEixos;
	
	public int getQtdeEixos() {
		return this.qtdeEixos;
	}

	@Override
	public int compareTo(Caminhao outroCaminhao) {
		if (this.qtdeEixos > outroCaminhao.qtdeEixos) {
			return -1;
		}
		
		if (this.qtdeEixos < outroCaminhao.qtdeEixos) {
			return 1;
		}
		
		return 0;
	}
}
