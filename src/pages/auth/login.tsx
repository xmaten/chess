import { Card } from "@/components/Card/Card"
import { Title } from "@/components/Title/Title"
import { Input } from "@/components/Input/Input"
import { useState } from "react"
import { ErrorText } from "@/components/ErrorText/ErrorText"
import { useRouter } from "next/router"
import { httpClient } from "@/services/httpClient"
import { Button } from "@/components/Button/Button"
import { AUTH_TOKEN_KEY } from "@/utils/constants"

type FormValues = {
  email: string
  password: string
}

const validate = ({ email, password }: FormValues): string | null => {
  if (!email) {
    return "Email is required"
  }

  if (!password) {
    return "Password is required"
  }

  if (!email.includes("@")) {
    return "Email is not valid"
  }

  return null
}

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    setError(null)
    e.preventDefault()

    const validation = validate({ email, password })

    if (validation) {
      // setError(validation)
      // return
    }

    const payload = {
      email,
      password
    }

    try {
      const { data } = await httpClient.post("/auth/login", payload)
      localStorage.setItem(AUTH_TOKEN_KEY, data.access_token)
      await router.push(`/`)
    } catch {
      setError("There was an error. Please try again later")
    }
  }

  return (
    <Card>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <Input value={email} onChange={setEmail} label="Email:" />
        <Input
          value={password}
          onChange={setPassword}
          type="password"
          label="Password:"
        />

        {error && <ErrorText error={error} />}

        <Button disabled={Boolean(error)} type="submit">
          Login
        </Button>
      </form>
    </Card>
  )
}

export default Login
