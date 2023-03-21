"use client";

import Link from "next/link";
import { useState } from "react";

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
  const [link, setLink] = useState("");
  const [slug, setSlug] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsFetching(true);

    const a = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link, type }),
    });

    setSlug(a.headers.get("slug"));
    setLink("");
    setIsFetching(false);
  }

  if (slug)
    return (
      <>
        <CreatedLink slug={decodeURI(slug)} />
        <div className="pt-6" />

        <div className="flex gap-4">
          <button
            type="button"
            className="font-semibold underline decoration-secondary decoration-1 underline-offset-4 transition-colors hover:decoration-primary"
            onClick={() => setSlug(null)}
          >
            Create New Link
          </button>
          <Link
            href="/"
            className="font-semibold underline decoration-secondary decoration-1 underline-offset-4 transition-colors hover:decoration-primary"
          >
            Go Home
          </Link>
        </div>
      </>
    );

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

const CreatedLink = ({ slug }: { slug: string }) => {
  const link = window.origin + "/" + slug;
  return (
    <div className="flex gap-4">
      <p className="text-lg font-semibold tracking-wide text-primary">{link}</p>
      <button
        type="button"
        className="font-semibold underline decoration-secondary decoration-1 underline-offset-4 transition-colors hover:decoration-primary"
        onClick={() => navigator.clipboard.writeText(link)}
      >
        Copy
      </button>
    </div>
  );
};
