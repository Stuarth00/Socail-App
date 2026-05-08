function PostContent({
  content_url,
  description,
}: {
  content_url: string;
  description: string | undefined;
}) {
  return (
    <div>
      {content_url?.[0] && <img src={content_url[0]} alt={description} />}
      <p>{description}</p>
    </div>
  );
}
export default PostContent;
