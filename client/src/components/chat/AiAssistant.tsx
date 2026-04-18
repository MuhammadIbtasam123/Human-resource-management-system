import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  "Apply leave for today",
  "How many leaves do I have left?",
  "Who's on leave this week?",
  "Show my attendance this month",
  "What's today's notice?",
];

const mockResponses: Record<string, string> = {
  "apply leave for today":
    "I can help you apply leave for today! 📝\n\nPlease confirm:\n- **Leave Type:** Casual Leave\n- **Date:** Today\n- **Reason:** (optional)\n\nShall I go ahead and submit this request?",
  "how many leaves do i have left?":
    "Here's your current leave balance:\n\n🟢 **Annual Leave:** 8 of 15 remaining\n🔵 **Sick Leave:** 5 of 7 remaining\n🟡 **Casual Leave:** 2 of 5 remaining\n⚪ **Unpaid Leave:** Unlimited\n\nWould you like to apply for leave?",
  "who's on leave this week?":
    "Here's who's on leave this week:\n\n📅 **Mon–Fri:**\n- Sarah Chen — Annual Leave (Mon–Wed)\n- Mike Johnson — Sick Leave (Tue)\n- Lisa Park — WFH (Thu–Fri)\n\nTotal: 3 team members affected.",
  "show my attendance this month":
    "Here's your attendance summary for this month:\n\n✅ **Present:** 18 days\n🏠 **WFH:** 3 days\n🔴 **Absent:** 1 day\n⏰ **Late Arrivals:** 2\n\nOverall attendance rate: **95.5%** — Great job! 👏",
  "what's today's notice?":
    "📢 **Today's Notices:**\n\n1. 🔴 **Urgent:** Office closure on Good Friday — Apr 18\n2. 📋 Updated travel reimbursement policy effective May 1\n3. 🎂 Sarah Chen's birthday today! Don't forget to wish her!",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(mockResponses)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }
  return "I'm your HR Assistant! I can help you with:\n\n• Checking leave balances\n• Applying for leave\n• Viewing attendance\n• Finding who's on leave\n• Company notices\n\nTry one of the quick actions below! 😊";
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi John! 👋 I'm your HR Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: getMockResponse(text),
          timestamp: new Date(),
        },
      ]);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110",
          !open && "animate-pulse"
        )}
        aria-label="Open AI Assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] rounded-xl border bg-card shadow-2xl flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
            <Avatar className="h-8 w-8 border-2 border-primary-foreground/30">
              <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">AI</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">HRM Assistant</p>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0">
            <div ref={scrollRef} className="p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <Avatar className="h-7 w-7 shrink-0 mt-1">
                      <AvatarFallback className="bg-accent text-accent-foreground text-[10px] font-bold">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-line",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                    <p className={cn("text-[10px] mt-1", msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground")}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-start">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-accent text-accent-foreground text-[10px] font-bold">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-xl px-4 py-3 rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick actions */}
          <div className="px-3 py-2 border-t flex gap-1.5 overflow-x-auto shrink-0">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => sendMessage(action)}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t shrink-0">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="h-9 text-sm flex-1"
              disabled={isTyping}
            />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" type="button">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-9 w-9 bg-accent text-accent-foreground hover:bg-accent/90" type="submit" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
