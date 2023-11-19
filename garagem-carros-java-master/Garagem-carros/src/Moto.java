
public class Moto extends Veiculo implements Comparable<Moto> {
	public int cilindradas;
	
	public int getCilindradas() {
		return this.cilindradas;
	}

	@Override
	public int compareTo(Moto outraMoto) {
		if (this.cilindradas > outraMoto.cilindradas) {
			return -1;
		}
		
		if (this.cilindradas < outraMoto.cilindradas) {
			return 1;
		}
		
		return 0;
	}
}
