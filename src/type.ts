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