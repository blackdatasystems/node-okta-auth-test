import React, { useState } from "react"
import { useOktaAuth } from "@okta/okta-react"

const Home = () => {
  const [messages, setMessages] = useState([])
  const { authState, oktaAuth } = useOktaAuth()
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" })

  const callBackend = async () => {
    const response = await fetch("http://localhost:8080/api/locked", {
      headers: {
        Authorization: `Bearer ${authState.accessToken ? authState.accessToken.accessToken : ""}`,
      },
    })

    if (!response.ok) {
      return Promise.reject()
    }
    const data = await response.json()
    setMessages(data.messages)
  }

  if (!authState) {
    return <div>Loading authentication...</div>
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <button onClick={login}>Login</button>
        <button onClick={callBackend}>Call api</button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, index) => (
              <tr key={index} id={message.id}>
                <td>{message.date}</td>
                <td>{message.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    )
  } else {
    return "You authenticated !"
  }
}
export default Home
