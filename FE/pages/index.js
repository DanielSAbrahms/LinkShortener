import Link from "next/link";

function HomePage() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/shortenurl">
          <a>Shorten URL</a>
        </Link>
      </li>
    </ul>
  );
}

export default HomePage;
