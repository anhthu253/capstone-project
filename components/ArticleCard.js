import styled from "styled-components";
import Image from "next/image";

export default function ArticleCard({ imageUrl }) {
  return <Image src={imageUrl} width={600} height={400}></Image>;
}
