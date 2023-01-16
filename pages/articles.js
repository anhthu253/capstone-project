import ArticleListContainer from "../components/ArticleListContainer";
import { useStore } from "../hooks/useStore";

export default function Home() {
  const articles = useStore((state) => state.articles);
  function RedirectPage() {
    const router = useRouter()
    // Make sure we're in the browser
    if (typeof window !== 'undefined') {
      router.push('/search')
    }
  }
  


  return <ArticleListContainer currentArticles={articles} />;
}
