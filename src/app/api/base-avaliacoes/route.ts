import { NextResponse } from "next/server";

export async function GET() {

    //REcuperando os dados da API JAVA
    try {
        const response = await fetch("http://192.168.0.13:8080/megafarma");
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Não consegui puxar os dados do estrela!", error);
        return NextResponse.json({error:"Erro nos dados do estrela :" + error});
    }
}