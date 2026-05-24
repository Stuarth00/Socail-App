function PostContent({ content_url }: { content_url: string }) {
  return (
    <div>{content_url && <img src={content_url} alt="Post content" />}</div>
  );
}
export default PostContent;
