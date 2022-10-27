import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import CollectionItem from "./CollectionItem";
export default function PopupMenu({ popUp, setPopUp, article }) {
  const [editMode, setEditMode] = useState(false);
  const addCollection = useStore((state) => state.addCollection);
  const collections = useStore((state) => state.collections);
  const add2Collection = useStore((state) => state.add2Collection);

  function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    addCollection({
      id: Math.random().toString(36).substring(2),
      name: data.name,
      description: data.description,
      articles: [],
    });

    setEditMode(false);
  }

  function onSelectedCollection(id) {
    add2Collection(article, id);
    setPopUp(false);
  }

  return (
    <StyledDiv>
      <StyledBack onClick={() => setPopUp(false)}>
        <StyledIcon icon="eva:arrow-back-outline" />
      </StyledBack>
      <StyledButton
        onClick={() => {
          setEditMode((editable) => !editable);
        }}
      >
        Create new collection
      </StyledButton>
      {editMode && (
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name </label>
            <input name="name" id="name" />
          </div>
          <div>
            <label htmlFor="description">Description </label>
            <textarea name="description" id="description" />
          </div>
          <ButtonContainer>
            <button
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </button>
            <button type="submit">Create</button>
          </ButtonContainer>
        </StyledForm>
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
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 50%;
  min-height: 300px;
  position: absolute;
  right: 0;
  top: 0;
  background-image: url("/images/background-paper.jpg");
  box-shadow: 3px 2px 3px 2px #838586;
  padding: 10px;
  text-align: center;
`;

const StyledBack = styled.div`
  text-align: left;
  margin-bottom: 15px;
`;

const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  height: 3rem;
  padding: 5px;
  background: #d8c9ad;
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

const CollectionContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
`;
