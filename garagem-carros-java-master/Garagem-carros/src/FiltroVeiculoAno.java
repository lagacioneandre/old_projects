
public class FiltroVeiculoAno extends Veiculo implements Comparable<Veiculo> {
	@Override
	public int compareTo(Veiculo outroVeiculo) {
		if (this.ano > outroVeiculo.ano) {
			return -1;
		}
		
		if (this.ano < outroVeiculo.ano) {
			return 1;
		}
		return 0;
	}

}
