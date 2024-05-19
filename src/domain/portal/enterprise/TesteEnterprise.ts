interface TesteEnterpriseProps {
  atributo1: string,
  atributo2: number
}

export class TesteEnterprise implements TesteEnterpriseProps {
  atributo1: string;
  atributo2: number;

  get atribute1(): string{
    return this.atribute1
  }
}