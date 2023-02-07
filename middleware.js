import { NextResponse } from "next/server";

export default function middleware(req) {
  const dataCookie = req.cookies.get("data");
  const url = req.url;

  if (!dataCookie && url !== "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (dataCookie && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/todo");
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
