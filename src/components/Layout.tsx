import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { StaticImage } from "gatsby-plugin-image";
import { WindowLocation } from "@reach/router";
import ThemeCheckbox from "./ThemeCheckbox";

export interface LayoutProps {
  children?: React.ReactNode;
  location: WindowLocation;
}
export const Layout = ({ children, location }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

  return (
    <div className="theme-dark h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-b-white/20 backdrop-blur bg-black">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <NavigationMenu className="flex items-center space-x-6 font-medium">
              <Link to="/">
                <StaticImage
                  className="w-9 h-9 rounded-full"
                  src="../images/starwatcher.jpg"
                  alt={data.site.siteMetadata.title}
                />
              </Link>
              {data.site.siteMetadata.menuLinks.map(
                ({ name, link }: { name: string; link: string }) => (
                  <Link
                    key={link}
                    to={link}
                    className={`${
                      link === location.pathname
                        ? "text-white"
                        : "text-white/60"
                    }
                    hover:text-white/80
                    `}
                  >
                    {name}
                  </Link>
                ),
              )}
            </NavigationMenu>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
};
