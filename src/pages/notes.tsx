import { Layout } from "@/components/Layout";
import { PageProps } from "gatsby";
import * as React from "react";

const NotesPage = ({ location }: PageProps) => {
  return <Layout location={location}>Notes</Layout>;
};

export const Head = () => <title>Notes</title>;

export default NotesPage;
