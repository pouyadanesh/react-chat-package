import React, { useState } from "react";
import { ChatWidget } from "@/components/chat";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Zap,
  Shield,
  Smartphone,
  Code,
  Globe,
} from "lucide-react";

const Index = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            ✨ Embeddable Chat Widget Demo
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-chat bg-clip-text text-transparent">
            Professional Chat Widget
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A beautiful, production-ready chat widget built with React and
            TypeScript. Easy to integrate, fully customizable, and designed for
            modern web applications.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => setIsOnline(!isOnline)} variant="outline">
              Toggle {isOnline ? "Offline" : "Online"}
            </Button>
            <Button
              onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
              variant="outline"
            >
              Toggle Maintenance
            </Button>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Simple Integration</h2>
          <p className="text-muted-foreground mb-8">
            Add a professional chat widget to your website in just a few lines
          </p>

          <Card className="text-left">
            <CardHeader>
              <CardTitle className="text-sm font-mono">
                Installation & Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto">
                <code>{`npm install embeddable-chat-module@latest

import { ChatWidget } from 'embeddable-chat-module';

<ChatWidget
    title="Support Chat"
    greetingMessage="Hi! How can I help you today?"
    isOnline={true}
    position="bottom-right"
    brandColor="#8B5CF6"
    apiEndpoint=''
    onCustomMessageHandler={(message) => callGetFeedBackFromAi(message)}
    onMessageSent={(message) => {}}
    isMaintenanceMode
    avatarUrl=''
    className=''
    defaultOpen
    maintenanceMessage='sorry but we all went to get coffee'
    maxMessages={5}
    persistMessages
    onToggle={(isOpen) => {}}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget
        title="Demo Chat"
        greetingMessage="Hi! This is a demo of the chat widget. Try sending a message!"
        isOnline={isOnline}
        isMaintenanceMode={isMaintenanceMode}
        position="bottom-right"
        persistMessages={true}
        onMessageSent={(message) => console.log("Message sent:", message)}
        onToggle={(isOpen) => console.log("Widget toggled:", isOpen)}
      />
    </div>
  );
};

export default Index;
