import styled from "styled-components";
import ArticleCard from "./ArticleCard";
import { useState } from "react";

const initialArticles = [
  {
    id: "24343",
    imageUrl: "/images/image-item1.jpg",
    text: `CANBERRA, Australia — Australia has reversed a previous government’s recognition of West Jerusalem as Israel’s capital, the foreign minister said Tuesday.
  
      The center-left Labor Party government Cabinet agreed to again recognize Tel Aviv as the capital and reaffirmed that Jerusalem’s status must be resolved in peace negotiations between Israel and the Palestinians, Foreign Minister Penny Wong said.
      
      `,
  },
  {
    id: "6454",
    imageUrl: "/images/image-item2.jpg",
    text: `The Pentagon is considering paying for the Starlink satellite network — which has been a lifeline for Ukraine — from a fund that has been used to supply weapons and equipment over the long term, according to two U.S. officials who are involved in the deliberations.
  
      The Ukraine Security Assistance Initiative is designed to provide enduring support for the Ukrainian military by financing contracts with American firms for weapons and equipment that would be delivered in months or even years.
      `,
  },
  {
    id: "5466",
    imageUrl: "/images/image-item4.jpg",
    text: `LONDON — In six short weeks, Liz Truss has succeeded in angering all wings of her party. Most now agree she can’t fight the next election.
  
      Britain’s latest prime minister, who won a Tory leadership contest with promises of tax cuts and “growth, growth, growth,” by Friday had driven supporters on the Tory right to send furious WhatsApp messages bemoaning her latest U-turn on corporation tax as more of her planned budget crumbled.
      
      “I’ve never known the atmosphere to be as febrile as it is at the moment,” one veteran Tory MP who backed Truss in the leadership contest said. Another MP who supported her said: “It feels like the end. I think she’ll be gone next week.”`,
  },
];

export default function ArticleListContainer({ className }) {
  const [articles, setArticles] = useState(initialArticles);

  return (
    <StyledListContainer className={className}>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article}></ArticleCard>
      ))}
    </StyledListContainer>
  );
}

const StyledListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 2rem;
  list-style: none;
  padding-inline-start: 0;
  overflow-wrap: break-word;
`;
