import styled from "styled-components";
import TextEntry from "./TextEntry";
import Button from "./Button";
import { useRouter } from "next/router";

export default function SearchContainer() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const results = await response.json();
    const articles = results.map((result) => {
      return { ...result, id: Math.random().toString(36).substring(2) };
    });

    localStorage.setItem("articles", JSON.stringify(articles));

    router.push("/");
  }

  return (
    <StyledSearchContainer onSubmit={handleSubmit}>
      <TextEntry
        label="keywords"
        id="keywords"
        name="keywords"
        placeholder="eg. election, bitcoin"
      />
      <TextEntry
        label="sources"
        id="sources"
        name="sources"
        placeholder="eg. nytimes, rolling stone"
      />
      <TextEntry
        label="domains"
        id="domains"
        name="domains"
        placeholder="eg. bbc.uk, politico.com"
      />
      <TextEntry
        label="from"
        id="from"
        name="from"
        placeholder="eg. 2022-10-01"
      />
      <TextEntry label="to" id="to" name="to" placeholder="eg. 2022-10-02" />
      <TextEntry
        label="language"
        id="language"
        name="language"
        placeholder="eg. de, en, es"
      />

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
        <label></label>
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
