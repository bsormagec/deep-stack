import { getSortedPosts } from '../../lib/posts';
import { markdownResponse, postMarkdown } from '../../lib/markdown';

export async function getStaticPaths() {
  return (await getSortedPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export function GET({ props, site }) {
  return markdownResponse(postMarkdown(props.post, site));
}
