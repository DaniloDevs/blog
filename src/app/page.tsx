"use client"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";



export default function Home() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/posts?populate=*');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: ApiResponse = await response.json();
        setBlogs(data.data); // Atualiza o estado com o array de blogs

      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="grid grid-cols-3 gap-2 min-h-screen flex-col items-center justify-between p-24">
      {blogs.map((blog) => (
        <Card key={blog.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`http://localhost:1337/${blog.attributes.image.data.url}`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog.attributes.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categoria: {blog.attributes.categoria}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Criador: {blog.attributes.criador}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Publicado em: {blog.attributes.publishedAt}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </main>
  );
}

interface BlogData {
  id: number;
  attributes: BlogAttributes;
}

interface BlogAttributes {
  title: string;
  categoria: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  criador: string;
  Publish: string;
  image: ImageData
}

interface ImageData {
  id: number;
  data: ImageAttributes;
}

interface ImageAttributes {
  url: string
}


interface ApiResponse {
  data: BlogData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}