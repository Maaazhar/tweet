import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-center mt-5 mb-1 px-2 py-2  backdrop-blur z-10">
      <p className="text-sm text-gray-600">
        Copyright © 2024-{currentYear} Tweet. All rights reserved. <br /> Concept, Design and Development by <Link
          className=" hover:text-sky-500"
          href="https://maaazhar.github.io/">
          Mazharul Islam.
        </Link>
      </p>
    </div>
  )
}

