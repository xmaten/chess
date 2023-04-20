import { Card } from "@/components/Card/Card"
import { Title } from "@/components/Title/Title"
import { Input } from "@/components/Input/Input"
import { useState } from "react"
import { ErrorText } from "@/components/ErrorText/ErrorText"
import { useRouter } from "next/router"
import { httpClient } from "@/services/httpClient"
import { Button } from "@/components/Button/Button"

type FormValues = {
  email: string
  password: string
  repeatPassword: string
}

const validate = ({
  email,
  password,
  repeatPassword
}: FormValues): string | null => {
  if (!email) {
    return "Email is required"
  }

  if (!password) {
    return "Password is required"
  }

  if (!repeatPassword) {
    return "Repeat password is required"
  }

  if (!email.includes("@")) {
    return "Email is not valid"
  }

  if (repeatPassword !== password) {
    return "Passwords are not the same"
  }

  return null
}

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    setError(null)
    e.preventDefault()

    const validation = validate({ email, password, repeatPassword })

    if (validation) {
      setError(validation)
      return
    }

    const payload = {
      email,
      password
    }

    try {
      await httpClient.post("/auth/register", payload)
      await router.push(`/auth/login`)
    } catch {
      setError("There was an error. Please try again later")
    }
  }

  return (
    <Card>
      <Title>Register</Title>
      <form onSubmit={handleSubmit}>
        <Input value={email} onChange={setEmail} label="Email:" />
        <Input
          value={password}
          onChange={setPassword}
          type="password"
          label="Password:"
        />
        <Input
          type="password"
          value={repeatPassword}
          onChange={setRepeatPassword}
          label="Repeat password:"
        />

        {error && <ErrorText error={error} />}

        <Button disabled={Boolean(error)} type="submit">
          Register
        </Button>
      </form>
    </Card>
  )
}

export default Register
