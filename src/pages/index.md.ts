import { getSortedPosts } from '../lib/posts';
import { indexMarkdown, markdownResponse } from '../lib/markdown';

export async function GET({ site }) {
  return markdownResponse(indexMarkdown(await getSortedPosts(), site));
}
