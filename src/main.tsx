import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const RootLayout = lazy(() => import("./components/RootLayout"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));
const Blog = lazy(() => import("./pages/Blog"));
const Post = lazy(() => import("./pages/Post"));
const BlogEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const LogInPage = lazy(() => import("./pages/admin/LogInPage"));
const BlogEditList = lazy(() => import("./pages/admin/BlogPosts"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const AdminHomePage = lazy(() => import("@/pages/admin/AdminHomePage"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const SessionProvider = lazy(() => import("@/lib/session-hook"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="blog">
                <Route index element={<Blog />} />
                <Route path=":slug" element={<Post />} />
              </Route>
              <Route path="contact" element={<ComingSoon />} />
              <Route path="guest-book" element={<ComingSoon />} />
              <Route path="chat-room" element={<ChatRoom />} />
              <Route path="photo-album" element={<ComingSoon />} />
              <Route path="about-me" element={<ComingSoon />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route element={<SessionProvider />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminHomePage />} />
                <Route path="blog-posts">
                  <Route index element={<BlogEditList />} />
                  <Route path=":slug" element={<BlogEditor />} />
                </Route>
                <Route path="albums" element={<ComingSoon />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="admin/login" element={<LogInPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
