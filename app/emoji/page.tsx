export default function EmojiPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl">😱😳🥴😎</h1>
      <div className="pt-8" />
      <form>
        <div className="flex flex-col gap-4">
          <input
            type="url"
            name="url"
            id="url"
            placeholder="https://link-you-wanna-shorten.com"
            className="w-[17rem] border-b border-b-secondary bg-dark focus:border-b-primary focus:outline-none"
          />
          <button
            type="submit"
            className="font-semibold underline decoration-secondary decoration-1 underline-offset-4 hover:decoration-primary"
          >
            Shorten With Emojis
          </button>
        </div>
      </form>
    </div>
  );
}
