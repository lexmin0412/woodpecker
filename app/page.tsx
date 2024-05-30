import Editor from "@/components/editor";
import React from "react";

console.log('process.cwd', process.cwd())

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
          href="https://github.com/lexmin0412/woodpecker"
          target="_blank"
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          <code className="font-mono text-2xl font-bold cursor-pointer">
            Woodpecker
          </code>
        </a>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/lexmin0412"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Lexmin0412
          </a>
        </div>
      </div>

      <div className="relative text-4xl font-bold">
        你的代码仓库健康检查工具。
      </div>

      <Editor />
    </main>
  );
}
