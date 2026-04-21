function PostContent({
  contentUrl,
  description,
}: {
  contentUrl: string;
  description: string;
}) {
  return (
    <div>
      <img src={contentUrl} alt="Content-image" />
      <p>{description}</p>
    </div>
  );
}
export default PostContent;
