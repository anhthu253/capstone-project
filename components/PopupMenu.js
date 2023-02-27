import styled from "styled-components";
import { useState } from "react";
import CollectionItem from "./CollectionItem";
import CollectionForm from "./CollectionForm";
import Button from "./Button";

export default function PopupMenu({
  popUp,
  setPopUp,
  currentCollections,
  article,
}) {
  const [editMode, setEditMode] = useState(false);
  const [collections, setCollections] = useState(currentCollections);

  function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    saveCollection2DB(data);
    setPopUp(false);
  }

  function onSelectedCollection(collectionId) {
    saveArticle2DB(collectionId);
    setPopUp(false);
  }

  async function saveCollection2DB(collection) {
    const { name, description } = collection;
    const newCollection = {
      name: name,
      description: description,
    };
    try {
      const response = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify(newCollection),
      });
      const createdCollection = await response.json();
      saveArticle2DB(createdCollection.createdId);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveArticle2DB(collectionId) {
    const { id, ...articleDB } = article;
    if (id === undefined) return;
    try {
      const response = await fetch("/api/article", {
        method: "PUT",
        body: JSON.stringify({...articleDB, collectionId: collectionId }),
      });
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
      <CollectionContainer>
        {!editMode && (
          <>
            <StyledP>Your collections</StyledP>
            {collections.map((collection) => (
              <CollectionItem
                key={collection.id}
                description={collection.description.length===0?"no description":collection.description}
                removeCollection={() => {}}
                onCollection={() => onSelectedCollection(collection.id)}
                removable={false}
              >
                {collection.name}
              </CollectionItem>
            ))}
          </>
        )}
      </CollectionContainer>
      {!editMode && (
        <StyledButtons>
          <StyledButton
            onClick={() => {
              setEditMode((editable) => !editable);
            }}
          >
            add
          </StyledButton>
          <StyledButton onClick={() => setPopUp(false)}>cancel</StyledButton>
        </StyledButtons>
      )}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f4;
`;

const StyledP = styled.p`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  padding: 10px 15px;
`;

const StyledButtons = styled.span`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const CollectionContainer = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;
