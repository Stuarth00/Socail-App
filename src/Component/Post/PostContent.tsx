function PostContent({
  content_url,
  description,
}: {
  content_url: string;
  description: string | undefined;
}) {
  return (
    <div>
      {content_url && <img src={content_url} alt={description} />}
      <p>{description}</p>
    </div>
  );
}
export default PostContent;
