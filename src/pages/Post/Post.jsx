import styles from "./Post.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img className={styles.image} src={post.image} alt={post.title} />
          <p className={styles.content}>{post.body}</p>
          <p className={styles.createdby}>
            Criado por: <span>{post.createdBy}</span>
          </p>
          <div className={styles.tags}>
            {post.tagsArray?.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
