import styled from "styled-components";
import Link from "next/link";
import CollectionItem from "../../components/CollectionItem";
import { getAllCollections } from "../../services/collectionService";
import { useState } from "react";
import CollectionForm from "../../components/CollectionForm";
import Button from "../../components/Button";

export async function getServerSideProps() {
  const currentCollections = await getAllCollections();

  return {
    props: { currentCollections },
  };
}

export default function Collections({ currentCollections }) {
  const [collections, setCollections] = useState(currentCollections);
  const [editMode, setEditMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    saveCollection2DB(data);
    setEditMode(false);
  }

  async function saveCollection2DB(collection) {
    const { name, description } = collection;
    const newCollection = {
      name: name,
      description: description,
    };
    try {
      await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify(newCollection),
      });
      reloadCollections();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeCollection(collectionId) {
    try {
      const response = await fetch(`/api/collection/${collectionId}`, {
        method: "DELETE",
      });
      reloadCollections();
    } catch (error) {
      console.error(error);
    }
  }

  async function reloadCollections() {
    try {
      const response = await fetch(`/api/collection`);
      const cols = await response.json();
      setCollections(cols);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <StyledSection>
      {editMode && (
        <CollectionForm
          onSubmit={handleSubmit}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      {!editMode && (
        <CollectionContainer>
          <StyledP>Your collections</StyledP>
          {collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              removable={true}
              removeCollection={() => removeCollection(collection.id)}
            >
              <Link href={`/collections/${collection.id}`} passHref>
                <Anchor>{collection.name}</Anchor>
              </Link>
            </CollectionItem>
          ))}
        </CollectionContainer>
      )}
      {!editMode && (
        <StyledButton
          onClick={() => {
            setEditMode((editable) => !editable);
          }}
        >
          add
        </StyledButton>
      )}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  text-align: center;
`;

const StyledButton = styled(Button)`
  padding: 10px 15px;
`;

const CollectionContainer = styled.ul`
  text-align: left;
  list-style: none;
  padding-inline-start: 0;
`;

const StyledP = styled.p`
  margin-bottom: 20px;
`;

const Anchor = styled.a`
  text-decoration: none;
`;
