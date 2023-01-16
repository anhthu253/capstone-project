import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavigationBar({ className }) {
  const router = useRouter();
  return (
    <StyledNav className={className}>
      <Link href="/articles" passHref>
        <StyledLink active={router.pathname === "/articles"}>articles</StyledLink>
      </Link>
      /
      <Link href="/collections" passHref>
        <StyledLink active={router.pathname === "/collections"}>
          collections
        </StyledLink>
      </Link>
      /
      <Link href="/dashboard" passHref>
        <StyledLink active={router.pathname === "/dashboard"}>
          dashboard
        </StyledLink>
      </Link>
      /
      <Link href="/" passHref>
        <StyledLink active={router.pathname === "/"}>search</StyledLink>
      </Link>
    </StyledNav>
  );
}
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid;
  padding: 15px 0;
  font-family: "Special Elite";
`;

const StyledLink = styled.a`
  margin: auto 0;
  text-decoration: none;
  background: ${({ active }) => (active ? "var(--navigation-color)" : "none")};
  &:hover {
    cursor: pointer;
  }
`;
