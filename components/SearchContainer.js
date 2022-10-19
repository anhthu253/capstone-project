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
    const { thema, source, publishedAt, country } = data;
    const response = await fetch(
      `/api/search?thema=${thema}&source=${source}&when=${publishedAt}&country=${country}`
    );
    const results = await response.json();
    localStorage.setItem("articles", JSON.stringify(results));
    router.push("/");
  }
  return (
    <StyledSearchContainer onSubmit={handleSubmit}>
      <TextEntry
        label="thema"
        id="thema"
        name="thema"
        placeholder="eg. politics"
      />
      <TextEntry
        label="source"
        id="source"
        name="source"
        placeholder="eg. nytimes"
      />
      <TextEntry
        label="published at"
        id="publishedAt"
        name="publishedAt"
        placeholder="eg. 2022-10-01"
      />
      <TextEntry
        label="country"
        id="country"
        name="country"
        placeholder="eg. england"
      />
      <StyledArticle>
        <label htmlFor="criteria">sorted by</label>
        <StyledSelect name="criteria" id="criteria">
          <option value="default"></option>
          <option value="thema">Thema</option>
          <option value="source">Source</option>
          <option value="publishedAt">Published At</option>
          <option value="country">Country</option>
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

const StyledArticle = styled.article`
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
