export type TipoAvaliacao = {
    idAvaliacao: number;
    nomeCliente: string;
    avaliacao: number;
    comentario: string;
}

export type TipoCarro = {
    idCarro?: number;
    modelo: string;
    ano: string;
    quilometragem: string;
    marca: string;
}

export type TipoLogin = {
    email: string;
    password: string;
}

export type TipoPeca = {
    idPeca?: number;
    nomePeca: string;
    precoPeca: string;
}

export type TipoOficina = {
    idOficina?: number;
    nome: string;
    CNPJ: string;
    telefone: string;
    endereco: string;
}