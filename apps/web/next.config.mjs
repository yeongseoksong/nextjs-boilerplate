import "./env.mjs";

/**
 * GitHub Pages는 정적 파일만 서빙하므로 `output: "export"`로 빌드한다.
 *
 * 프로젝트 페이지는 `https://<user>.github.io/<repo>/` 아래에 놓이므로 basePath가
 * 필요하다. 로컬 dev에서는 루트로 서빙되어야 하니 환경변수로만 켠다
 * (워크플로가 NEXT_PUBLIC_BASE_PATH=/<repo> 를 넣어준다).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  // export 모드에서는 next/image 최적화 서버가 없다.
  images: { unoptimized: true },
  // GitHub Pages는 /about → /about/index.html 로 해석하므로 슬래시를 붙여야
  // 새로고침·직접 진입 시 404가 나지 않는다.
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default nextConfig;
