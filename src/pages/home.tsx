import { Layout } from "@/components/Layout";
import { PageProps } from "gatsby";
import * as React from "react";

const HomePage = ({ location }: PageProps) => {
  return <Layout location={location}>Home</Layout>;
};

export const Head = () => <title>Home Page</title>;

export default HomePage;
