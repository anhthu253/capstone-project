import styled from "styled-components";
import TextEntry from "./TextEntry";
import Button from "./Button";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";
import searchCriteria from "../lib/searchCriteria";

export default function SearchContainer() {
  const router = useRouter();
  const setArticles = useStore((state) => state.setArticles);

  async function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    const entries = Object.entries(data);
    const params = entries.map((entry) => entry.join("=")).join("&");

    const response = await fetch(`/api/search?${params}`);
    const results = await response.json();
    const articles = results.map((result) => {
      return { ...result, id: Math.random().toString(36).substring(2) };
    });

    setArticles(articles);

    router.push("/");
  }

  return (
    <StyledSearchContainer onSubmit={handleSubmit}>
      {searchCriteria.map((entry) => (
        <TextEntry key={entry.id} {...entry} />
      ))}
      <StyledArticle>
        <label htmlFor="sortBy">sorted by</label>
        <StyledSelect name="sortBy" id="sortBy">
          <option value="publishedAt">Published At</option>
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
        </StyledSelect>
      </StyledArticle>
      <StyledArticle>
        <label></label>
        <StyledButton>Search</StyledButton>
      </StyledArticle>
    </StyledSearchContainer>
  );
}

const StyledSearchContainer = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: var(--line-primary);
`;

const StyledArticle = styled.section`
  display: grid;
  grid-template-columns: 6rem 12rem 1fr;
  gap: 1rem;
`;

const StyledSelect = styled.select`
  height: 2rem;
  border-radius: 5px;
  border: var(--line-secondary);
`;

const StyledButton = styled(Button)`
  justify-self: end;
`;
