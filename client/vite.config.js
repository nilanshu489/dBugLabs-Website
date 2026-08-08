import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Hosts the dev/preview server will answer to when the Host header isn't
 * localhost.
 *
 * The leading dot matches a domain and all of its subdomains, so a new ngrok
 * URL keeps working without editing this file — the free tier hands out a
 * different subdomain on every restart.
 *
 * This list is the dev server's DNS-rebinding guard, so keep it to tunnel
 * providers actually in use rather than replacing it with `true`.
 */
const tunnelHosts = ['.ngrok-free.app', '.ngrok.io', '.trycloudflare.com']

/**
 * Tunnels terminate TLS at the provider, so the HMR socket has to dial back
 * over 443/wss rather than the local http port. Opt in with `TUNNEL=1`,
 * because forcing it unconditionally would send plain `localhost` sessions to
 * wss://localhost:443 and break hot reload for everyone not using a tunnel.
 *
 *   TUNNEL=1 npm run dev --workspace client
 */
const viaTunnel = process.env.TUNNEL === '1'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: tunnelHosts,
    ...(viaTunnel && { hmr: { clientPort: 443, protocol: 'wss' } })
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: tunnelHosts
  }
})
