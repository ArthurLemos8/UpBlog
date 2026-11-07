import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o UP <span>Blog</span>
      </h2>
      <p>
        O UP Blog é um espaço criado para compartilhar ideias, conhecimentos e
        descobertas sobre diferentes assuntos. Aqui você poderá encontrar
        publicações sobre tecnologia, programação, ciência, games, esportes,
        curiosidades e acontecimentos que despertam nossa atenção.
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default About;
