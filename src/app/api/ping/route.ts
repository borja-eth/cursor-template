import { NextResponse } from "next/server";

export const GET = () => {
    return new NextResponse("pong", { status: 200 });
};
