import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await fetch('/api/python-route');
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch from Python backend' });
    }
}