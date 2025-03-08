import type React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

const RealtimeAPIDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Managing Realtime Sessions, Conversations, and Responses</h1>

      {/* Table of Contents */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
        <ul className="list-disc list-inside">
          <li>
            <a href="#about-realtime-sessions" className="text-blue-600 hover:underline">
              About Realtime Sessions
            </a>
          </li>
          <li>
            <a href="#session-lifecycle-events" className="text-blue-600 hover:underline">
              Session Lifecycle Events
            </a>
          </li>
          <li>
            <a href="#text-inputs-and-outputs" className="text-blue-600 hover:underline">
              Text Inputs and Outputs
            </a>
          </li>
          <li>
            <a href="#audio-inputs-and-outputs" className="text-blue-600 hover:underline">
              Audio Inputs and Outputs
            </a>
          </li>
          <li>
            <a href="#voice-activity-detection" className="text-blue-600 hover:underline">
              Voice Activity Detection (VAD)
            </a>
          </li>
          <li>
            <a href="#function-calling" className="text-blue-600 hover:underline">
              Function Calling
            </a>
          </li>
          <li>
            <a href="#error-handling" className="text-blue-600 hover:underline">
              Error Handling
            </a>
          </li>
        </ul>
      </div>

      {/* About Realtime Sessions */}
      <section id="about-realtime-sessions" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Realtime Sessions</h2>
        <p className="mb-4">
          A Realtime session is a stateful interaction between the model and a connected client. The key components of
          the session are:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            The <strong>session</strong> object, which controls the parameters of the interaction
          </li>
          <li>
            A <strong>conversation</strong>, which represents user inputs and model outputs
          </li>
          <li>
            <strong>Responses</strong>, which are model-generated audio or text outputs
          </li>
        </ul>
      </section>

      {/* Session Lifecycle Events */}
      <section id="session-lifecycle-events" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Session Lifecycle Events</h2>
        <p className="mb-4">
          After initiating a session, you can update the current session configuration with the{" "}
          <code>session.update</code> event.
        </p>
        <SyntaxHighlighter language="javascript" style={tomorrow}>
          {`// Update the system instructions used by the model in this session
const event = {
  type: "session.update",
  session: {
    instructions: "Never use the word 'moist' in your responses!"
  }
};

// Send the event over WebRTC data channel or WebSocket
dataChannel.send(JSON.stringify(event));`}
        </SyntaxHighlighter>
      </section>

      {/* Add more sections here */}
    </div>
  )
}

export default RealtimeAPIDocs

