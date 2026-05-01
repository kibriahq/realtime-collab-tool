import EditorWrapper from './EditorWrapper'

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = {
    name: 'Kibria' + Math.floor(Math.random() * 1000),
    color: '#4dabf7'
  }

  return (
    <main className="container mx-auto">
      <EditorWrapper roomName={id} user={user} />
    </main>
  )
}