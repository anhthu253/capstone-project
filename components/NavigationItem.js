import styled from "styled-components";
import Link from "next/link";

export default function NavigationItem({ className, children }) {
  <Link href={"home"} className="className">
    <a>{children}</a>
  </Link>;
}

const StyledLink = styled.a`
  padding: 0.5rem;
  color: white;
  background: darkslategray;
  border: none;
  text-decoration: ${({ active }) => (active ? "underline" : "none")};

  &:hover {
    background: darkgreen;
    cursor: pointer;
  }
`;
