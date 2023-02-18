import styled from "styled-components";
import Dropzone from "../components/Dropzone";
import DragContainer from "../components/DragContainer";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import ColorBox from "../components/ColorBox";
import { getAllSelections } from "../services/articleService";

const colorSet = [
  { id: "5454", color: "transparent" },
  { id: "87", color: "#E8E19C" },
  { id: "987", color: "#A5E89C" },
  { id: "986", color: "#9CD0E8" },
  { id: "455", color: "#E194B8" },
];
const MAX_DROP_ITEMS = 8;
export async function getServerSideProps() {
  const allSelections = await getAllSelections();
  return {
    props: {
      allSelections,
    },
  };
}

export default function Dashboard({ allSelections }) {
  const dropzoneRef = useRef();
  const [draggableItems, setDraggableItems] = useState(allSelections);
  const [remainDragItemCount, setRemainDragItemCount] = useState(
    allSelections.length
  );
  const [colorPalette, setColorPalette] = useState({});
  const [currentDraggable, setCurrentDraggable] = useState({
    id: "",
  });

  const [board, setBoard] = useState([]);

  function openColorPalette(event, id) {
    event.preventDefault();
    setCurrentDraggable({ id: id });

    //popup the color pallete at right mouse click
    setColorPalette({
      display: true,
      posX: event.pageX - 80 + "px",
      posY: event.pageY + "px",
    });
  }

  //set color background for the clicked draggable item
  function chooseColor(color) {
    setDraggableItems((prevlist) =>
      prevlist.map((item) =>
        item.id === currentDraggable.id
          ? { ...item, backgroundColor: color }
          : item
      )
    );
    setColorPalette((pl) => {
      return { ...pl, display: false };
    });
  }

  function setBoardFromDropzone(dropzoneWraper) {
    const dropzone = dropzoneWraper.firstChild;
    const dropzoneItems = [...dropzone?.children];
    
    const newItems = dropzoneItems.map((item) => {
      return {
        id: item.getAttribute("id"),
        articleID: item.getAttribute("data-articleid"),
        text: item.textContent,
        color: getComputedStyle(item).backgroundColor,
      };
    });
    setBoard(newItems);
  }

  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  function drop(event) {
    event.preventDefault();
    const dataID = event.dataTransfer.getData("text");

    //only allow drop for an amount equal to MAX_DROP_ITEMS items
    if (
      event.target.id === "DraggableContainer" ||
      event.target.children.length <= MAX_DROP_ITEMS
    ) {
      event.currentTarget.appendChild(
        document.querySelector(`#${CSS.escape(dataID)}`)
      );
    }
  }

  function clearDropzone(dropzoneWraper) {
    const dropzone = dropzoneWraper.firstChild;
    dropzone.innerHTML = "";
  }

  async function saveBoardToDB() {
    try {
      const response = await fetch(`/api/dashboard`, {
        method: "POST",
        body: JSON.stringify({ board: board }),
      });
      clearDropzone(dropzoneRef.current);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateSelectionsToDB(){
    //update remain draggable items in drag zone
    //group these items by article ID
    const remainSelections =draggableItems.filter(item => !board.map(boardItem => boardItem.id).
    includes(item.id)).reduce((group,item) => {
      const {articleID} = item
      group[articleID]= group[articleID] ?? []
      group[articleID].push(Object.fromEntries(Object.entries(item).filter(([key]) => key!=="articleID" && key!=="color")))
      return group
    },{})
    try{
      await fetch('/api/article',{
        method:"PUT",
        body: JSON.stringify(remainSelections)
      })
    }
    catch(error){
      console.error(error)
    }

  }

  //close the color palette by clicking outside it
  function closeColorPalette(event) {
    if (event.target.id !== "ColorPalette")
      setColorPalette((pl) => {
        return { ...pl, display: false };
      });
  }
  useEffect(() => {
    document.body.addEventListener("click", closeColorPalette);
    return () => {
      document.body.removeEventListener("click", closeColorPalette);
    };
  }, []);

  useEffect(() => {
    setBoardFromDropzone(dropzoneRef.current);
  }, [remainDragItemCount, colorPalette]);

  return (
    <>
      {colorPalette.display && (
        <ColorPalette
          id="ColorPalette"
          top={colorPalette.posY}
          left={colorPalette.posX}
        >
          {colorSet.map((color) => (
            <ColorBox
              key={color.id}
              background={color.color}
              onChooseColor={() => chooseColor(color.color)}
            />
          ))}
        </ColorPalette>
      )}
      <DragContainer
        id="DraggableContainer"
        draglist={draggableItems}
        ondragstart={drag}
        ondrop={(event) => {
          drop(event);
          setRemainDragItemCount((prevCount) => prevCount + 1);
        }}
        onRightClick={(event, id) => openColorPalette(event, id)}
      ></DragContainer>

      <DZWrapper ref={dropzoneRef}>
        <Dropzone
          id={"Dropzone"}
          ondragover={(event) => {
            event.preventDefault();
          }}
          ondrop={(event) => {
            drop(event);
            setRemainDragItemCount((prevCount) => prevCount - 1);
          }}
        ></Dropzone>
        {board.length > 0 && <StyledIcons>
          <Icon
            icon="fluent:save-20-filled"
            width="25"
            onClick={() => {
              saveBoardToDB()
              updateSelectionsToDB()
            }}
          ></Icon>
        </StyledIcons>}
      </DZWrapper>

      <Link href="/boardCollections" passHref>
        <Anchor>see saved dashboards here</Anchor>
      </Link>
    </>
  );
}

const Anchor = styled.a`
  font-style: italic;
  text-decoration: underline;
  text-underline-offset: 3px;
  :hover {
    cursor:pointer;
  }
`;

const DZWrapper = styled.div`
  position: relative;
  padding: 10px 0;
`;

const StyledIcons = styled.span`
  position: absolute;
  top: 20px;
  right: 46%;
  color: #757677;
  :hover {
    cursor:pointer;
  }
`;

const ColorPalette = styled.span`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background: #d3d3d3;
  display: flex;
  gap: 10px;
  padding: 10px;
  border: var(--line-secondary);
  z-index: 2000;
`;
