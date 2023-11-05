import { Layout } from "@/components/Layout";
import { PageProps } from "gatsby";
import * as React from "react";

const AboutPage = ({ location }: PageProps) => {
  return <Layout location={location}>About</Layout>;
};

export const Head = () => <title>About</title>;

export default AboutPage;
