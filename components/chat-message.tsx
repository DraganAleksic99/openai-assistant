import Markdown from "react-markdown";
import { Message } from "ai";

const UserMessage = ({ text }: { text: string | undefined }) => {
  return <div className="text-black bg-white self-end">{text}</div>;
};

const AssistantMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="bg-[#efefef]">
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
