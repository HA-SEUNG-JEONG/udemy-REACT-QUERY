import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery

  //두 번째 인수는 데이터를 가져오는 비동기 함수여야 한다.
  //세 번째 인수로 staleTime을 설정하면 처음에는 fresh 상태였다가 해당 시간이 지나면 stale로 바뀜
  const { data, isError, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Oops.. Something went wrong..</h3>;

  return (
    <>
      <ul>
        {/* fetchPosts 함수는 비동기이기 때문에 데이터가 들어오기 전까지는 빈 배열이다. */}
        {data.map((post) => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disable={currentPage <= 1}
          onClick={() => {
            setCurrentPage((cur) => cur - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((cur) => cur + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
