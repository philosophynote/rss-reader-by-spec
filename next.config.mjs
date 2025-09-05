import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly set the tracing root to this app to avoid
  // Next.js inferring a parent directory due to other lockfiles.
  outputFileTracingRoot: path.resolve(__dirname)
}

export default nextConfig
