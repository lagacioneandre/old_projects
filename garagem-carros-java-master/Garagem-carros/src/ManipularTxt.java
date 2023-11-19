import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

public class ManipularTxt {
	public void gravar(List<Veiculo> listaVeiculos) throws IOException {
		File file = new File("ListaVeiculos.txt");
		
		try {
			PrintStream arquivo = new PrintStream(file);
			
			for (int i = 0; i < listaVeiculos.size(); i++) {
				Veiculo veiculo = listaVeiculos.get(i);
				String formatoSalvar = veiculo.modelo + ";" + veiculo.ano + ";" + veiculo.placa + ";" + veiculo.valor + ";" + veiculo.tipo;
				
				if (veiculo.tipo == 1) {
					formatoSalvar += ";" + veiculo.getCilindradas();
				} else if (veiculo.tipo == 3) {
					formatoSalvar += ";" + veiculo.getQtdeEixos();
				}
				
				arquivo.println(formatoSalvar);
			}
			
			arquivo.close();
			System.out.println("Lista de veículos salva com sucesso!!");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Veiculo> ler() throws IOException {
		List<Veiculo> listaVeiculos = new ArrayList<Veiculo>();
		
		try {
			BufferedReader arquivo = new BufferedReader(new FileReader("ListaVeiculos.txt"));
			
			while(arquivo.ready()) {
				Veiculo veiculo = new Veiculo();
				String linhaArquivo = arquivo.readLine();
				String atributos[] = linhaArquivo.split(";");
				int tipo = Integer.parseInt(atributos[4]);
				
				veiculo.modelo = atributos[0];
				veiculo.ano = Integer.parseInt(atributos[1]);
				veiculo.placa = atributos[2];
				veiculo.valor = Double.parseDouble(atributos[3]);
				veiculo.tipo = tipo;
				
				if (tipo == 1) {
					Moto moto = new Moto();
					moto.cilindradas = Integer.parseInt(atributos[5]);
				} else if (tipo == 3) {
					Caminhao caminhao = new Caminhao();
					caminhao.qtdeEixos = Integer.parseInt(atributos[5]);
				}
				
				listaVeiculos.add(veiculo);
			}
			
			arquivo.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return listaVeiculos;
	}
}
