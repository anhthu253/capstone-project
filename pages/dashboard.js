import styled from "styled-components";
import Dropzone from "../components/Dropzone";
import DragContainer from "../components/DragContainer";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import ColorBox from "../components/ColorBox";

const draglist = [
  {
    id: "5343",
    content:
      "a quick 1% on the statement, assuming a newfound focus on “cumulative tightening” and “lags” signaled a shift in the committee’s thinking. Inklings of such a turn had already been offered by Fed officials, including Bullard, Daly, Evans and Kashkari. Markets could take comfort that the Fed was in sync with other central banks, with recent market instability forcin",
    backgroundColor: "transparent",
  },
  {
    id: "7565",
    content:
      "solve Paul Volcker had demonstrated some 40 years earlier. I respect and admire Powell. His Fed has made historic mistakes, but he’s determined to try to make amends. The Chair is doin",
    backgroundColor: "transparent",
  },
  {
    id: "5867",
    content:
      " want people to understand our commitment to getting this done. And to not making the mistake of not doing enough - or the mistake of withdrawing our strong policy and doing that",
    backgroundColor: "transparent",
  },
  {
    id: "1345",
    content:
      "ned or moved too fast. I think it’s been good and a successful program that we’ve gotten this far this fast. Remember though that we still think there’s a need for ongoing rate increases, a",
    backgroundColor: "transparent",
  },
  {
    id: "3671",
    content:
      "ay night (8 November) expecting a Republican landslide, as of Wednesday morning we still do not know who will control the Senate or even the House, which Republicans were supposed to win easily. Democrats held on in swing districts in Virginia; they even flipped some in Ohio. And while Florida looks lost from Democrats to Republicans for the foreseeable future, Pennsylvania (where John Fetterman won the Senate race), Wisconsin and Arizona, all of which Biden won in 2020, appear to be at the very least still in play for the party. The Democra",
    backgroundColor: "transparent",
  },
  {
    id: "9808",
    content:
      "use (the latter, at least, will still almost certainly be Republican; midterms are meant to be bad for the party in power). And we will undoubtedly hear competing explanations as to what happened. Some will say moderates were scared off by Donald Trump’s continued dominance of the Republican Party; others, that they lost because he wasn’t on the ballot. There will b",
    backgroundColor: "transparent",
  },
  {
    id: "0983",
    content:
      " reject political debate on right-wing terms. I’m going to take this opportunity to do the same: however Republicans try to spin the results, whatever nonsensical claims of fraud they draw up, their electoral offer was rejected by many who were expected to eagerly vote for it. They put up bad candidates and they ran extremist campaigns. They beat themselves. If they don",
    backgroundColor: "transparent",
  },
  {
    id: "9084",
    content:
      "Midterm elections are meant to be bad for the party in power. Midterms are definitely meant to be bad for the party in power when inflation and gas prices are high and the president isn’t popular with voters",
    backgroundColor: "transparent",
  },
];

const colorSet = [
  { id: "5454", color: "transparent" },
  { id: "87", color: "#E8E19C" },
  { id: "987", color: "#A5E89C" },
  { id: "986", color: "#9CD0E8" },
  { id: "455", color: "#E194B8" },
];
const MAX_DROP_ITEMS = 8;

export default function Dashboard() {
  const [draggableItems, setDraggableItems] = useState(draglist);
  const [remainDragItemCount, setRemainDragItemCount] = useState(
    draglist.length
  );

  const [dropzones, setDropzones] = useState([
    {
      id: Math.random().toString(36).substring(2),
      text: "Drop here!",
    },
  ]);

  const [colorPalette, setColorPalette] = useState({});
  const [currentDraggable, setCurrentDraggable] = useState({
    id: "",
  });

  function openColorPalette(event, id) {
    event.preventDefault();
    setCurrentDraggable({ id: id });

    //popup the color pallete at right mouse click
    setColorPalette({
      display: true,
      posX: event.pageX + "px",
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
    )
      event.currentTarget.appendChild(
        document.querySelector(`#${CSS.escape(dataID)}`)
      );
  }

  function removeBoard(id) {
    setDropzones((dropzones) => dropzones.filter((dz) => dz.id !== id));
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

      <DropzoneContainer>
        {dropzones.map((dropzone) => (
          <DZWrapper key={dropzone.id}>
            <Dropzone
              key={dropzone.id}
              ondragover={(event) => {
                event.preventDefault();
              }}
              ondrop={(event) => {
                drop(event);
                setRemainDragItemCount((prevCount) => prevCount - 1);
              }}
            ></Dropzone>
            <StyledIcons>
              <Icon icon="fluent:save-20-filled" width="25"></Icon>
              {dropzones.length > 1 && (
                <Icon
                  icon="eva:file-remove-fill"
                  width="25"
                  onClick={() => removeBoard(dropzone.id)}
                ></Icon>
              )}
            </StyledIcons>
          </DZWrapper>
        ))}
        <StyledButton
          onClick={() => {
            setDropzones((prevDZ) => [
              { id: Math.random().toString(36).substring(2) },
              ...prevDZ,
            ]);
          }}
        >
          Add board
        </StyledButton>
      </DropzoneContainer>
    </>
  );
}

const DZWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  background-color: "transparent"
  padding: 15px;
  margin: 10px 0;
  width:100px;
`;

const DropzoneContainer = styled.div`
  padding: 10px 0;
`;

const StyledIcons = styled.span`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
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
