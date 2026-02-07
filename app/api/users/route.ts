import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("http://localhost:8081/user");
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data from backend:", error);
        return NextResponse.json({ error: "Failed to fetch data from backend" }, { status: 500 });
    }  
}
