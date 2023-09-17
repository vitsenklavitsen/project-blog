import React from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import COMPONENT_MAP from "@/helpers/mdx-components";
import { BLOG_TITLE } from "@/constants";

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  if (!blogPost) {
    notFound();
  }

  const { frontmatter, content } = blogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  if (!blogPost) {
    notFound();
  }

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

export default BlogPost;
