"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <span className="desc text-center">NFT Pulse</span>
      </Link>
    </nav>
  );
};

export default Navbar;
