import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: "DELETE",
  });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: "PATCH",
    data: { title: "REACT QUERY FOREVER!!!!" },
  });
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError, error } = useQuery(["comments", post.id], () =>
    fetchComments(post.id)
  );

  //useMutation은 쿼리 키랑 상관없음
  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) <h3>Loading...</h3>;
  if (isError)
    <>
      <h3>
        <p>{error.toString()}</p>
      </h3>
    </>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError ? <p style={{ color: "red" }}>Error Deleting Posts</p> : null}
      {deleteMutation.isLoading ? <p style={{ color: "purple" }}>Loading Deleting Posts</p> : null}
      {deleteMutation.isSuccess ? <p style={{ color: "green" }}>Success Deleting Posts</p> : null}

      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {updateMutation.isError ? <p style={{ color: "red" }}>Error Updating Posts</p> : null}
      {updateMutation.isLoading ? <p style={{ color: "purple" }}>Loading Updating Posts</p> : null}
      {updateMutation.isSuccess ? <p style={{ color: "green" }}>Success Updating Posts</p> : null}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
