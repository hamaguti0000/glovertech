<template>
  <div class="my-8 rounded-lg border border-line bg-surface-alt p-6 sm:p-8">
    <p class="text-xs font-bold text-body">補助金は、実施している主体ごとに窓口が分かれています</p>

    <div class="mt-5 space-y-3">
      <div class="flex items-center gap-4 rounded-lg bg-white p-4">
        <span class="flex h-10 w-16 shrink-0 items-center justify-center rounded bg-navy text-xs font-bold text-white">国</span>
        <div>
          <p class="text-sm font-bold text-navy">国の制度</p>
          <p class="mt-0.5 text-xs leading-relaxed text-body">IT導入補助金など。全国どこでも対象。競争率は高め。</p>
        </div>
      </div>

      <div class="ml-6 flex items-center gap-4 rounded-lg bg-white p-4">
        <span class="flex h-10 w-16 shrink-0 items-center justify-center rounded bg-navy/80 text-xs font-bold text-white">県</span>
        <div>
          <p class="text-sm font-bold text-navy">長崎県の制度</p>
          <p class="mt-0.5 text-xs leading-relaxed text-body">県内事業者向け。県のサイトや商工会議所経由で公募。</p>
        </div>
      </div>

      <div class="ml-12 flex items-center gap-4 rounded-lg bg-white p-4">
        <span class="flex h-10 w-16 shrink-0 items-center justify-center rounded bg-navy/60 text-xs font-bold text-white">市町村</span>
        <div>
          <p class="text-sm font-bold text-navy">長崎市など市町村の制度</p>
          <p class="mt-0.5 text-xs leading-relaxed text-body">地域の事業者に特化。金額は小さめでも採択されやすい傾向。</p>
        </div>
      </div>
    </div>

    <p class="mt-4 text-xs leading-relaxed text-body">
      ※ 同じ取り組みでも、国・県・市それぞれの制度に対象になる可能性があります。上から順に確認していくのがおすすめです。
    </p>
  </div>
</template>
