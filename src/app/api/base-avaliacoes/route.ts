import { NextResponse } from "next/server";

export async function GET() {

    //Recuperando os dados da API JAVA
    try {
        const response = await fetch("http://192.168.0.13:8080/avaliacao");
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Não consegui puxar os dados da avaliação!", error);
        return NextResponse.json({error:"Erro nos dados da avaliação :" + error});
    }
}