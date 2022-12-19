import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0");
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery

  //두 번째 인수는 데이터를 가져오는 비동기 함수여야 한다.
  const { data } = useQuery("posts", fetchPosts);
  console.log(data);

  return (
    <>
      <ul>
        {/* fetchPosts 함수는 비동기이기 때문에 데이터가 들어오기 전까지는 빈 배열이다. */}
        {data?.map((post) => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
