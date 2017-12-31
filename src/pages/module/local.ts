export class Local {
  public nome: string;
  public atividade: string;
  public horario: string;
  public latitude: number;
  public longitude: number;


  local(nome, atividade, horario, latitude, longitude) {
    this.nome = nome;
    this.atividade = atividade;
    this.horario = horario;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
