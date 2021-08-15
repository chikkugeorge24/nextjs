import React from "react";
// import Image from "next/image";
import img from "public/1.jpg";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const Pets = () => {
  return (
    <div>
      Pets
      {/* <Image src={img} alt="pet" width="280" height="420" placeholder="blur" />
      {["1", "2", "3", "4", "5"].map((path) => {
        return (
          <div key={path}>
            <Image
              src={`/${path}.jpg`}
              alt="pets"
              width="280"
              height="420"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
        );
      })} */}
    </div>
  );
};

export default Pets;
