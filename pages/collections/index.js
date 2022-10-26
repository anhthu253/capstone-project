import ArticleListContainer from "../../components/ArticleListContainer";
import { useStore } from "../../hooks/useStore";
import styled from "styled-components";
import Link from "next/link";
import CollectionItem from "../../components/CollectionItem";
import { useRouter } from "next/router";
export default function Collections() {
  const collections = useStore((state) => state.collections);
  const setCurrentCollection = useStore((state) => state.setCurrentCollection);
  const removeCollection = useStore((state) => state.removeCollection);
  const router = useRouter();
  function onSelectedCollection(collection) {
    setCurrentCollection(collection);
    router.push("/collections/collection");
  }
  return (
    <StyledSection>
      <CollectionContainer>
        {collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            removeCollection={() => removeCollection(collection.id)}
            onCollection={() => onSelectedCollection(collection)}
            removable={true}
          >
            {collection.name}
          </CollectionItem>
        ))}
      </CollectionContainer>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  position: relative;
`;

const StyledButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  background: var(--background-primary);
  box-shadow: 3px 2px 3px 2px var(--line-color);
  border: var(--line-color);
`;

const CollectionContainer = styled.ul`
  list-style: none;
`;
