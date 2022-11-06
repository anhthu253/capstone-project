import styled from "styled-components";
import { Icon } from "@iconify/react";
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
        body: JSON.stringify({ ...articleDB, collectionId: collectionId }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledDiv>
      <StyledSection>
        <StyledButton
          onClick={() => {
            setEditMode((editable) => !editable);
          }}
        >
          Create new collection
        </StyledButton>
        {editMode && (
          <CollectionForm
            onSubmit={handleSubmit}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
        <CollectionContainer>
          {!editMode &&
            collections.map((collection) => (
              <CollectionItem
                key={collection.id}
                removeCollection={() => {}}
                onCollection={() => onSelectedCollection(collection.id)}
                removable={false}
              >
                {collection.name}
              </CollectionItem>
            ))}
        </CollectionContainer>
      </StyledSection>
      <Back onClick={() => setPopUp(false)}>
        <StyledIcon icon="fluent:arrow-exit-20-regular" width="25" />
      </Back>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50%;
  min-height: 300px;
  background-image: url("/images/background-paper.jpg");
  box-shadow: 5px 5px 5px 5px #838586;
  padding: 10px;
  z-index: 9999;
`;

const StyledSection = styled.section`
  grid-column: 2;
  text-align: center;
`;
const Back = styled.section`
  grid-column: 3;
  text-align: right;
`;

const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  background-color: #d8c9ad;
  padding: 15px;
  margin: 10px 0;
`;

const CollectionContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  list-style: none;
  padding-inline-start: 0;
`;
