import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center mt-10 mb-2 pt-10 pb-2 px-2 backdrop-blur z-10">
      <p className="text-sm text-slate-500">
        Copyright © 2024-{currentYear} Tweet. All rights reserved. || Concept, Design and Development by <Link
          className=" hover:text-sky-500"
          href="https://maaazhar.github.io/"
          target="_blank">
          Mazharul Islam.
        </Link>
      </p>
    </footer>
  )
}

