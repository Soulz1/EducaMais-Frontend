"use client";

import React, { useState, useEffect } from "react";
import PostCard from "@/app/components/PostCard";
import { postService } from "@/app/services/postService";
import { authClient } from "@/app/services/authClient";

// --- Definição dos Tipos ---
interface Author {
  id: number;
  email: string;
  name: string | null;
}

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorId: number;
  createdAt: string;
  atualizacao: string;
  autor: Author;
}
// --- FIM DOS TIPOS ---

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      titulo: "Introdução ao TypeScript",
      conteudo:
        "TypeScript é um superconjunto de JavaScript que adiciona tipagem estática...",
      autorId: 101,
      createdAt: "2023-10-01T10:00:00Z",
      atualizacao: "2023-10-05T14:30:00Z",
      autor: {
        id: 101,
        email: "ana.silva@email.com",
        name: "Ana Silva",
      },
    },
    {
      id: 2,
      titulo: "Dicas de React Hooks",
      conteudo:
        "Hooks como useEffect e useState revolucionaram a forma como escrevemos componentes...",
      autorId: 102,
      createdAt: "2023-11-15T09:20:00Z",
      atualizacao: "2023-11-15T09:20:00Z",
      autor: {
        id: 102,
        email: "bruno.oliveira@email.com",
        name: "Bruno Oliveira",
      },
    },
    {
      id: 3,
      titulo: "O que há de novo no Next.js",
      conteudo:
        "A App Router trouxe muitas mudanças na forma de lidar com rotas e Server Components...",
      autorId: 101, // Reutilizando a mesma autora
      createdAt: "2023-12-01T16:45:00Z",
      atualizacao: "2023-12-02T10:00:00Z",
      autor: {
        id: 101,
        email: "ana.silva@email.com",
        name: "Ana Silva",
      },
    },
    {
      id: 4,
      titulo: "Post de Autor Anônimo",
      conteudo: "Este é um exemplo de post onde o nome do autor é nulo.",
      autorId: 103,
      createdAt: "2024-01-10T11:00:00Z",
      atualizacao: "2024-01-10T11:00:00Z",
      autor: {
        id: 103,
        email: "anonimo@provedor.com",
        name: null, // Testando a propriedade name: string | null
      },
    },
  ]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook de autenticação
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const sessionUser = session?.user;

  // Debug: Veja no console do navegador (F12) o que está chegando
  console.log("Sessão:", session);
  console.log("Carregando Auth:", isAuthLoading);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      try {
        // const result = await postService.getAllPosts();
        // setPosts(result.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      setError(null);
      try {
        await postService.deletePost(postId);
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== postId)
        );
        alert("Post excluído com sucesso!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao excluir o post.");
        }
      }
    }
  };

  // Carregamento Geral (Auth ou Posts)
  if (isAuthLoading || isLoadingPosts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Carregando painel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md m-4">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Cabeçalho do Dashboard */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          {/* Se o user existir, mostramos. Se não tiver nome, usamos o email */}
          {sessionUser && (
            <p className="text-gray-600 mt-1">
              Olá,{" "}
              <span className="font-semibold">
                {sessionUser.name || sessionUser.email}
              </span>
              !
            </p>
          )}
        </div>
      </div>

      {/* Lista de Posts */}
      {posts.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">Nenhum post publicado.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post: Post) => (
            <PostCard
              isAdmin
              key={`${post.id}`}
              post={post}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
