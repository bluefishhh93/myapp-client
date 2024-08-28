/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "*.pinimg.com",
          port: "",
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "3000",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  