export const metadata = {
  title: "Quadeer's Arena",
  description: 'A blog for personal needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body>
        <header>
          <h1>MA Quadeer</h1>
          <p>A place where I store junk.</p>
          <hr />
        </header>

        {children}

        <footer>
            <hr />
          <h3>Designed by shoaib asim</h3>
          <p>Copyrights reserved by Shoaib Asim </p>
        </footer>
      </body>
    </html>
  )
}
