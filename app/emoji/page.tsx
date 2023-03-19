// client component
import { CreateLinkForm } from "~~/components/Form";

export default function EmojiPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl">😱😳🥴🥵</h1>
      <div className="pt-8" />
      <CreateLinkForm type="emoji" />
    </div>
  );
}
