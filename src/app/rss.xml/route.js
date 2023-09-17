import RSS from "rss";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export async function GET() {
  // Create feed
  const feed = new RSS({
    title: BLOG_TITLE,
    description: "A blog about frontend development",
    feed_url: "http://localhost:3000/rss.xml",
    site_url: "http://localhost:3000",
  });

  // Get a list of all blog posts to populate the feed
  const blogPosts = await getBlogPostList();
  // Add a feed item for every blog post
  blogPosts.forEach(({ slug, title, abstract, publishedOn }) => {
    feed.item({
      title,
      description: abstract,
      url: `http://localhost:3000/${slug}`,
      guid: slug,
      date: publishedOn,
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/xml" },
  });
}
