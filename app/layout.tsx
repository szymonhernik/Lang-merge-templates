export const metadata = {
  title: 'Narges Mohammadi',
  description:
    'Narges Mohammadi (1993) is a Dutch-Afghan artist, curator, and DJ currently based in The Hague, the Netherlands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
