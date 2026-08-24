/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal, self-contained server bundle in .next/standalone
  // that only needs node + the copied files to run — ideal for Docker.
  output: "standalone",
};

export default nextConfig;
