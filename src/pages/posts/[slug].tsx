import { GetServerSideProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import Image from 'next/image';

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
    thumb: {
      url: string;
      dimensions: {
        width: string;
        height: string;
      } 
    }
  }
}

export default function Post({post}: PostProps) {
  return (
    <>
    <Head>
      <title>{post.title} | MHDEV</title>
    </Head>

    <main className={styles.container}>
      <article className={styles.post}>


      <time>{post.updatedAt}</time>
        <h1>{post.title}</h1>
        
        <Image width={post.thumb.dimensions.width} height={post.thumb.dimensions.height} alt="thumb do post" src={post.thumb.url}></Image>

        <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}} />

      </article>
    </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {

  const {slug} = params;


  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('post', String(slug), {

  });

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    thumb: response.data.thumb
    
  }

  return {
    props: {
      post
    }
  }
  
}