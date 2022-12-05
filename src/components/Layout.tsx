import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Todo App" }: Props) => (
  <main>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <nav>
        <Link href="/todo-api">Todo with API</Link> |
        <Link href="/todos-local"> Todo with Local State</Link>
      </nav>
    </header>
    {children}
  </main>
);

export default Layout;
