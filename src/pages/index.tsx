import { ButtonLink } from "@/components/ButtonLink/ButtonLink"
import { Title } from "@/components/Title/Title"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col gap-10">
      <Title>Play Chess</Title>
      <div>
        <ButtonLink url="/game/join">Join Game</ButtonLink>
        <ButtonLink url="/game/create">Create Game</ButtonLink>
      </div>
    </div>
  )
}
