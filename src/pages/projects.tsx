import { Layout } from "@/components/Layout";
import { PageProps } from "gatsby";
import * as React from "react";

const ProjectsPage = ({ location }: PageProps) => {
  return <Layout location={location}>Projects</Layout>;
};

export const Head = () => <title>Projects</title>;

export default ProjectsPage;
