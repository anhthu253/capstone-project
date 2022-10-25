import styled from "styled-components";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export default function NavigationBar({ className }) {
  const router = useRouter();
  return (
    <StyledNav className={className}>
      <Link href="/" passHref>
        <StyledLink active={router.pathname === "/"}>Home</StyledLink>
      </Link>
      <Link href="/collections" passHref>
        <StyledLink active={router.pathname === "/collections"}>
          Collections
        </StyledLink>
      </Link>
      <Link href="/search" passHref>
        <StyledLink active={router.pathname === "/search"}>
          <Icon icon="ant-design:file-search-outlined" />
        </StyledLink>
      </Link>
    </StyledNav>
  );
}
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row wrap;
  justify-content: space-between;
  border-top: var(--line-primary);
  border-bottom: var(--line-primary);
`;

const StyledLink = styled.a`
  margin: auto 0;
  text-decoration: none;
  color: ${({ active }) => (active ? "var(--navigation-color)" : "none")};
  &:hover {
    cursor: pointer;
  }
`;
