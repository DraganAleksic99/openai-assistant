import Markdown from "react-markdown";
import { Message } from "ai/react";

const UserMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="text-white bg-black self-end py-2 px-4 rounded-3xl">
      {text}
    </div>
  );
};

const AssistantMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="bg-[#efefef] py-2 px-4 rounded-3xl w-fit">
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default function ChatMessage({ role, content }: Partial<Message>) {
  switch (role) {
    case "user":
      return <UserMessage text={content} />;
    case "assistant":
      return <AssistantMessage text={content} />;
    default:
      return null;
  }
}
