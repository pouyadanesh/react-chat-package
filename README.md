# Embeddable Chat Module

A customizable, easy-to-integrate React chat widget to add real-time support chat to your application.

---

## Demo

![Alt text](demo.gif) / ![](demo.gif)

---

## Installation

Install the library via npm:

```bash
npm install embeddable-chat-module
Usage
Import and use the ChatWidget component in your React app:

tsx
Copy
Edit
import { ChatWidget } from "embeddable-chat-module";

function App() {
  return (
    <ChatWidget
      title="Support Chat"
      greetingMessage="Hi! How can I help you today?"
      isOnline={true}
      position="bottom-right"
      brandColor="#8B5CF6"
      apiEndpoint=""
      onCustomMessageHandler={(message) => callGetFeedBackFromAi(message)}
      onMessageSent={(message) => {}}
      isMaintenanceMode={true}
      avatarUrl=""
      className=""
      defaultOpen={true}
      maintenanceMessage="Sorry but we all went to get coffee"
      maxMessages={5}
      persistMessages={true}
      onToggle={(isOpen) => {}}
    />
  );
}
Props Explanation
Prop	Type	Default	Description
title	string	"Chat"	The title shown on the chat widget header.
greetingMessage	string	"Hello!"	Initial message greeting the user when chat opens.
isOnline	boolean	true	Shows online/offline status of support.
position	"bottom-left" | "bottom-right"	"bottom-right"	Position of the chat widget on the screen.
brandColor	string	"#8B5CF6"	Primary color for the chat UI, matching your brand style.
apiEndpoint	string	""	Backend API endpoint for sending and receiving chat messages.
onCustomMessageHandler	(message: string) => void	undefined	Callback when a custom message is received, for handling AI or custom logic.
onMessageSent	(message: string) => void	undefined	Callback triggered when the user sends a message.
isMaintenanceMode	boolean	false	If true, disables chat and shows a maintenance message.
maintenanceMessage	string	"We are currently offline"	Message displayed when in maintenance mode.
avatarUrl	string	""	URL for avatar image shown in the chat header.
className	string	""	Additional CSS class names for custom styling.
defaultOpen	boolean	false	Whether the chat widget is open by default on page load.
maxMessages	number	10	Maximum number of messages to display before oldest are removed.
persistMessages	boolean	false	If true, messages persist in local storage between sessions.
onToggle	(isOpen: boolean) => void	undefined	Callback when the chat widget is opened or closed.

Why These Props?
Customizability: You can fully tailor the chat widget’s appearance (brandColor, position, avatarUrl) to fit your brand.

Control: Maintenance mode lets you gracefully disable chat during downtime.

Extensibility: Callbacks like onCustomMessageHandler and onMessageSent enable integrating AI or backend logic.

User Experience: Persisting messages and limiting max messages improves performance and keeps context for users.

Tech Stack
React — UI library for component-driven architecture.

TypeScript — Type safety and better developer experience.

Vite — Fast, modern build tool for bundling the library.

Tailwind CSS — Utility-first styling for rapid UI development.

shadcn-ui — Prebuilt accessible UI components enhancing look and feel.