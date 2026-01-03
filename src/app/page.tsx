"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import SearchBar from "./components/SearchBar";
import PostCard from "./components/PostCard";
import { Post, postService } from "./services/postService";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const LIMIT = 20;

  const fetchPosts = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    setHasError(false);

    try {
      let response;
      if (search.trim()) {
        response = await postService.searchPosts(search, page, LIMIT);
      } else {
        response = await postService.getAllPosts(page, LIMIT);
      }

      if (response.data.length === 0) {
        if (page > 1) {
          alert("Não há mais posts para exibir.");
          setIsLastPage(true);
          setCurrentPage(page - 1);
        } else {
          setPosts([]);
        }
      } else {
        setPosts(response.data);
        setIsLastPage(response.data.length < LIMIT);
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage, searchTerm);
  }, [currentPage, fetchPosts]);

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    setIsLastPage(false);
    fetchPosts(1, searchTerm);
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsLastPage(false);
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home | EducaMais</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-[#62A59D]">
            Últimas Notícias e Artigos
          </h1>
        </header>

        <div className="mb-12">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearchSubmit}
          />
        </div>

        <section className="space-y-6 min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#62A59D] mb-4"></div>
              <p>Carregando...</p>
            </div>
          ) : hasError ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center border border-red-100">
              Erro de conexão com o servidor.
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200 italic text-gray-500">
              Nenhum post encontrado.
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </section>

        {!isLoading && !hasError && (posts.length > 0 || currentPage > 1) && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              ← Anterior
            </button>
            <span className="text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
              Página {currentPage}
            </span>
            <button
              onClick={handleNextPage}
              disabled={isLastPage}
              className="px-5 py-2 text-sm font-medium text-white bg-[#62A59D] rounded-md hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
            >
              Próxima →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
