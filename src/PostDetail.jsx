import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  
  // == We are using ["comments", post.id] rather than only "comments" as it's same key for every post
  // == It will never refesh the comments. So we are using diff combination
  const {data, isError, error, isLoading} = useQuery(["comments", post.id], () => fetchComments(post.id));

  const deleteMutation = useMutation((postId) => deletePost(postId))

  const updateMutation = useMutation((postId) => updatePost(postId))

  if(isLoading) return <div> Loading post details...</div>;
  if(isError) return <div> Something wrong happened<br/><p>{error.toString()}</p></div>;


  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>

      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <p style={{color:'red'}}>Error on delete post</p> }
      {deleteMutation.isLoading && <p style={{color:'purple'}}>Deleting post</p> }
      {deleteMutation.isSuccess && <p style={{color:'green'}}>Deleted post successfully</p> }


      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {updateMutation.isError && <p style={{color:'red'}}>Updating not happened</p>}
      {updateMutation.isLoading && <p style={{color:'purple'}}>Updating</p>}
      {updateMutation.isSuccess && <p style={{color:'greed'}}>Updated post</p>}


      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
