import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Todo App" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <nav>
        <Link href="/">Todo with API</Link> |
        <Link href="/todos-local"> Todo with Local State</Link>
      </nav>
    </header>
      {children}
    <footer>
      <hr />
    </footer>
  </div>
);

export default Layout;