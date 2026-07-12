<template>
  <div class="my-8 rounded-lg border border-line bg-surface-alt p-6 sm:p-8">
    <div class="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr,auto,1fr,auto,1fr]">
      <div class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
        <svg class="h-10 w-10 text-navy" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M6 8h28a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H16l-7 6v-6H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"
            fill="currentColor"
            opacity="0.12"
          />
          <path
            d="M6 8h28a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H16l-7 6v-6H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linejoin="round"
          />
        </svg>
        <p class="mt-2 text-sm font-bold text-navy">あなたの質問</p>
        <p class="mt-1 text-xs leading-relaxed text-body">「お詫びメールを書いて」など、知りたいことを入力</p>
      </div>

      <div class="flex items-center justify-center text-navy" aria-hidden="true">
        <svg class="h-6 w-6 rotate-90 sm:rotate-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
        <svg class="h-10 w-10 text-navy" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="15" fill="currentColor" opacity="0.12" />
          <circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="1.6" />
          <path
            d="M13 20h3l2-5 4 10 2-5h3"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="mt-2 text-sm font-bold text-navy">学習した文章パターンから予測</p>
        <p class="mt-1 text-xs leading-relaxed text-body">「この文脈なら次はこの言葉」を1語ずつ計算</p>
      </div>

      <div class="flex items-center justify-center text-navy" aria-hidden="true">
        <svg class="h-6 w-6 rotate-90 sm:rotate-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
        <svg class="h-10 w-10 text-navy" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect x="8" y="5" width="24" height="30" rx="2" fill="currentColor" opacity="0.12" />
          <rect x="8" y="5" width="24" height="30" rx="2" stroke="currentColor" stroke-width="1.6" />
          <path
            d="M13 13h14M13 19h14M13 25h9"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
        <p class="mt-2 text-sm font-bold text-navy">回答文として表示</p>
        <p class="mt-1 text-xs leading-relaxed text-body">組み立てた文章を画面に返す</p>
      </div>
    </div>

    <p class="mt-4 text-xs leading-relaxed text-body">
      ※ 「調べて答えている」のではなく「もっともらしい文章を組み立てている」のが実際の仕組みです。この違いが、後述する注意点にもつながります。
    </p>
  </div>
</template>
