import styled from "styled-components";
import NavigationItem from "./NavigationItem";
import Link from "next/link";

export default function NavigationBar({ className }) {
  return (
    <StyledNav className={className}>
      <Link href="/" passHref>
        <StyledLink>Home</StyledLink>
      </Link>
      <Link href="collections" passHref>
        <StyledLink>Collections</StyledLink>
      </Link>
      <Link href="dashboard" passHref>
        <StyledLink>Dashboard</StyledLink>
      </Link>
    </StyledNav>
  );
}
const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: var(--line-primary);
  border-bottom: var(--line-primary);
`;

const StyledLink = styled.a`
  justify-self: center;
  margin: auto 0;
  text-decoration: none;
  &:hover {
    background: lightblue;
    cursor: pointer;
  }
`;
