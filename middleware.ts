import { withAuth } from "next-auth/middleware";

// Jawnie eksportujemy domyślną funkcję middleware z NextAuth
export default withAuth({
  pages: {
    signIn: "/login", // Upewniamy się, że middleware wie, dokąd odsyłać niezalogowanych
  },
});

export const config = {
  // Ścieżki, które mają być chronione
  matcher: [
    "/dashboard/:path*",
    "/leave-request/:path*",
    "/admin-panel/:path*",
  ],
};
