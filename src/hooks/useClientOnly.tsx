import { useEffect, useState } from 'react'

/**
 * Hook to ensure content only renders on the client side
 * Helps prevent hydration mismatches between server and client
 */
export function useClientOnly() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

/**
 * Component wrapper to prevent hydration issues
 * Usage: <ClientOnly>{content}</ClientOnly>
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const hasMounted = useClientOnly()

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}