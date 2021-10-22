import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

import Prismic from '@prismicio/client';
import {RichText} from 'prismic-dom';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  thumb: {
    url: string;
    dimensions: {
      width: string;
      height: string;
    } 
  }
}

interface PostProps {
  posts: Post[]
}

export default function Posts({posts}: PostProps) {
  return(
    <>
      <Head>
        <title>Posts | MHDEV</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.map(post => (
           
            <Link key={post.slug} href={`/posts/${post.slug}`}>
                <a>
                <Image width={post.thumb.dimensions.width} height={post.thumb.dimensions.height} alt="thumb do post" src={post.thumb.url}/>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
            ))
          }
        
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['Post.title', 'Post.content'],
      pageSize: 100
    }
  );

  console.log(response.results);

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      thumb: post.data.thumb
    }
  })

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {
      posts
    }
  }
}