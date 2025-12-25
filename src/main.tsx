import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = lazy(() => import("./pages/Home"));
const RootLayout = lazy(() => import("./components/RootLayout"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));
const Blog = lazy(() => import("./pages/Blog"));
const Post = lazy(() => import("./pages/Post"));
const BlogEditor = lazy(() => import("./pages/admin/BlogEditor"));
const LogIn = lazy(() => import("./pages/admin/LogIn"));
const BlogEditList = lazy(() => import("./pages/admin/BlogEditList"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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

          <Route path="admin">
            <Route path="blog-upload">
              <Route index element={<BlogEditList />} />
              <Route path=":slug" element={<BlogEditor />} />
            </Route>
            <Route path="login" element={<LogIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
