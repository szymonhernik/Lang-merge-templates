export default async function RootLayout(props) {
  return (
    <html>
      <head></head>
      <body style={{ margin: 0 }}>{props.children}</body>
    </html>
  )
}
