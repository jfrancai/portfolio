import { Layout } from "@/components/Layout";
import { PageProps } from "gatsby";
import * as React from "react";

const ToolsPage = ({ location }: PageProps) => {
  return <Layout location={location}>Tools</Layout>;
};

export const Head = () => <title>Tools</title>;

export default ToolsPage;
