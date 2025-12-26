// src/app/components/PostForm/index.tsx

"use client";
import React, { useState, useEffect } from "react";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Label from "../label";
import { Textarea } from "../textarea/Textarea";

interface PostFormProps {
  initialData?: { titulo: string; conteudo: string };
  onSubmit: (data: { titulo: string; conteudo: string }) => Promise<void>;
  isSubmitting: boolean;
}

export default function PostForm({
  initialData,
  onSubmit,
  isSubmitting,
}: PostFormProps) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || "");
      setConteudo(initialData.conteudo || "");
    }
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!titulo.trim()) {
      setError("O título é obrigatório.");
      return;
    }
    if (!conteudo.trim() || conteudo.trim().length < 100) {
      setError(
        "O conteúdo é obrigatório e deve ter pelo menos 100 caracteres."
      );
      return;
    }

    try {
      await onSubmit({ titulo: titulo.trim(), conteudo: conteudo.trim() });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Falha ao salvar o post.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {error && (
        <div
          style={{
            padding: "0.75rem",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
          }}
        >
          Erro: {error}
        </div>
      )}

      {/* Campo Título */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label htmlFor="titulo">Título da Postagem</Label>
        <Input
          id="titulo"
          name="titulo"
          type="text"
          placeholder="Digite um título chamativo..."
          value={titulo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitulo(e.target.value)
          }
          disabled={isSubmitting}
        />
      </div>

      {/* Campo Conteúdo */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label htmlFor="conteudo">Conteúdo da Postagem</Label>
        <Textarea
          id="conteudo"
          name="conteudo"
          placeholder="Escreva o conteúdo do post..."
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Post"}
        </Button>
      </div>
    </form>
  );
}
