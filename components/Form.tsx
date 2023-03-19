"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { LinkType } from "~~/core/link";

function getButtonText(type: LinkType): string {
  switch (type) {
    case "emoji":
      return "Shorten With Emojis";
    case "sketchy":
      return "Create Sketchy Link";
  }
}

export const CreateLinkForm = ({ type }: { type: LinkType }) => {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isMutating = isFetching || isPending;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsFetching(true);

    await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link, type }),
    });

    setIsFetching(false);

    startTransition(() => router.refresh());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <input
          type="url"
          name="url"
          id="url"
          autoComplete="off"
          placeholder="https://link-you-wanna-shorten.com"
          className="w-[17rem] border-b border-b-secondary bg-dark focus:border-b-primary focus:outline-none"
          required
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        <button
          type="submit"
          disabled={isMutating}
          className={`font-semibold underline decoration-secondary decoration-1 underline-offset-4 transition-colors hover:decoration-primary ${
            isMutating ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {getButtonText(type)}
        </button>
      </div>
    </form>
  );
};
