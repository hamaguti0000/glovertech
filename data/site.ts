export interface Problem {
  title: string
  description: string
}

export interface Service {
  title: string
  description: string
  items: string[]
}

export interface Plan {
  name: string
  price: string
  description: string
}

export interface FlowStep {
  step: number
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export const siteMeta = {
  // TODO: サイト名を差し替え
  name: 'サイト名（準備中）',
  title: '長崎の中小企業向けAI導入支援｜補助金活用で始める業務効率化',
  description:
    '長崎県内の中小企業・個人事業主向けにAI導入と業務効率化を伴走支援。ChatGPT等のAI活用、業務自動化、HP運用を補助金活用の提案とセットで。初回相談無料。',
  // TODO: 本番ドメインに差し替え
  url: 'https://example.com',
  ogImage: '/ogp.png',
  areaServed: '長崎県',
}

export const header = {
  name: siteMeta.name,
  tagline: '補助金ナビ　長崎 運営',
  ctaLabel: '無料相談',
  ctaHref: '/#contact',
}

export const footer = {
  name: siteMeta.name,
  description: '長崎の中小企業・個人事業主向けにAI導入と業務効率化を伴走支援しています。',
  // TODO: 所在地の市名を差し替え
  address: '所在地：長崎県【市名】',
  links: [
    { label: '運営者情報', href: '/about' },
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: '特定商取引法に基づく表記', href: '/tokushoho' },
  ],
  relatedSite: {
    label: '運営サイト',
    name: '補助金ナビ　長崎',
    // TODO: 本番URLに差し替え
    href: 'https://example.com',
  },
}

export const hero = {
  title: '長崎の会社の、その手作業をAIでなくしませんか？',
  highlight: 'その手作業をAIでなくし',
  subtitle:
    '補助金の活用も見据えた、長崎のAI導入・業務効率化支援。相談だけで終わらせず、実装までお手伝いします。',
  badges: ['相談無料', '30分', 'オンラインOK'],
  ctaLabel: '無料相談を申し込む（30分・オンライン）',
  ctaHref: '#contact',
}

export const stickyCta = {
  label: '無料相談を申し込む（30分・無料）',
  href: '#contact',
}

export const sectionLabels = {
  problems: 'お悩み',
  services: 'サポート内容',
  subsidy: '補助金',
  pricing: '料金',
  flow: '流れ',
  profile: '運営者',
  faq: 'よくある質問',
  contact: 'お問い合わせ',
}

export const problems: Problem[] = [
  {
    title: '毎日の手作業',
    description:
      '夕方5時。今日も請求書の転記が終わっていない。そんな日が続いていませんか。',
  },
  {
    title: '問い合わせ対応',
    description:
      'お客様やお取引先からの問い合わせ対応に追われ、他の業務が後回しになっていませんか。',
  },
  {
    title: 'AIを使いこなせない',
    description:
      'ChatGPTなどのAIツールが気になっても、何からどう始めればいいか分からないままになっていませんか。',
  },
]

export const services: Service[] = [
  {
    title: 'AI活用支援',
    description: 'ChatGPT等のAIツールの導入から、社内で使い続けられる形での定着までをサポートします。',
    items: ['ツール選定・導入', '使い方のレクチャー', '社内ルールづくり'],
  },
  {
    title: '業務の自動化',
    description: 'スプレッドシート連携やクラウドサービスの選定を通じて、手作業を減らす仕組みをつくります。',
    items: ['スプレッドシート連携', 'クラウドサービス選定', '業務フローの整理'],
  },
  {
    title: 'ホームページ・IT運用サポート',
    description: 'ホームページの運用や、日々のIT周りのちょっとした困りごとに継続的に対応します。',
    items: ['ホームページ更新・保守', 'IT環境の相談', 'トラブル時のサポート'],
  },
]

export const subsidy = {
  lead: '導入費用は、補助金でまかなえる場合があります',
  body:
    '私は『補助金ナビ 長崎』を運営していて、長崎県内の補助金情報を毎日見ています。だから、御社のAI導入や業務効率化の取り組みがどの補助金の対象になりそうか、相談の中で一緒に確認できます。',
  notes: [
    '※補助金の利用には公募期間・要件・審査があります。',
    '※申請書類の作成代行は行っておりません。',
  ],
  examplesHeading: '対象になりそうな補助金の例',
  // TODO: 実際の補助金名を記入
  examples: ['【補助金名を後で記入】', '【補助金名を後で記入】', '【補助金名を後で記入】'],
}

export const plans: Plan[] = [
  {
    name: '無料相談',
    price: '0円',
    description: '現状の課題や困りごとをヒアリングします。まずはお気軽にご相談ください。',
  },
  {
    name: '課題整理レポート',
    price: '3万円',
    description: 'ヒアリング内容をもとに、課題の整理と改善の方向性をレポートにまとめます。',
  },
  {
    name: 'スポット導入',
    price: '5万円〜',
    description: 'AI活用や自動化など、特定の業務改善を一度きりの支援として実施します。',
  },
  {
    name: '月額サポート',
    price: '3万円〜',
    description: '導入後の運用サポートや、継続的な改善を月単位で伴走します。',
  },
]

export const flowSteps: FlowStep[] = [
  {
    step: 1,
    title: '無料相談（30分）',
    description: 'オンラインで現状の課題や困りごとをお聞きします。この時点での費用はかかりません。',
  },
  {
    step: 2,
    title: '課題整理レポート',
    description: 'ヒアリング内容をもとに、課題の整理と改善の方向性をレポートにまとめてお渡しします。',
  },
  {
    step: 3,
    title: '納得した場合のみ継続',
    description:
      'レポートの内容にご納得いただけた場合のみ、次のステップに進みます。無理にお勧めすることはありません。',
  },
]

export const profile = {
  // TODO: 氏名を差し替え
  name: '氏名（準備中）',
  role: '長崎県在住 Webエンジニア（PHP / Laravel）',
  description:
    '「補助金ナビ　長崎」を個人で開発・運営しています。日々の開発業務のかたわら、長崎県内の中小企業・個人事業主のAI導入や業務効率化のご相談をお受けしています。',
  meetingHours: '打ち合わせは平日夕方・土日に対応しています。',
}

export const faqItems: FaqItem[] = [
  {
    question: '平日日中の対応は可能ですか？',
    answer:
      '本業の都合上、平日日中の対応が難しい場合があります。打ち合わせは平日夕方・土日を中心にご案内しています。',
  },
  {
    question: '補助金は必ず使えますか？',
    answer:
      '補助金の利用は、公募期間や要件、審査の状況によって変わるため、必ず使えるとは限りません。また、申請書類の作成代行は行っておりません。ご相談の中で、対象になりそうな補助金の情報をお伝えします。',
  },
  {
    question: '対応エリアはどこですか？',
    answer:
      '長崎市・佐世保市・諫早市・大村市など長崎県内全域に対応しています。オンラインでの相談・打ち合わせも可能です。',
  },
  {
    question: '社内にIT担当者がいなくても相談できますか？',
    answer:
      'はい、問題ありません。IT担当者が不在の事業者様からのご相談も多くお受けしています。専門用語を使わずにご説明します。',
  },
  {
    question: '料金の目安を教えてください。',
    answer:
      '無料相談は0円、課題整理レポートは3万円です。その後の支援内容に応じて、スポット導入は5万円〜、月額サポートは3万円〜となります。詳しくは料金表をご覧ください。',
  },
]

export const contact = {
  heading: 'お問い合わせ',
  description: 'まずは無料相談から。下記フォームよりお気軽にお問い合わせください。',
  // TODO: FormspreeのエンドポイントIDに差し替え
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
}

export const aboutPage = {
  heading: '運営者情報',
  items: [
    { label: '氏名', value: profile.name },
    { label: '所在地', value: '【所在地をご記入ください】' },
    { label: '経歴', value: '【経歴をご記入ください】' },
  ],
  relatedSite: {
    heading: '運営サイト',
    body: '【補助金ナビ　長崎の紹介文をご記入ください】',
    name: footer.relatedSite.name,
    href: footer.relatedSite.href,
  },
}

export const privacyPage = {
  heading: 'プライバシーポリシー',
  updatedAt: '【最終更新日をご記入ください】',
  sections: [
    {
      heading: '取得する情報',
      body: 'お問い合わせフォームより、お名前・会社名・メールアドレス・相談内容をご入力いただきます。',
    },
    {
      heading: '利用目的',
      body: 'いただいた情報は、お問い合わせへの回答および無料相談のご案内のためにのみ利用します。',
    },
    {
      heading: '第三者提供について',
      body: '法令に基づく場合を除き、ご本人の同意なく第三者へ提供することはありません。',
    },
    {
      heading: '保管・管理',
      body: 'いただいた情報は適切に管理し、目的の達成に必要な範囲を超えて保管しません。',
    },
    {
      heading: 'お問い合わせ窓口',
      body: '本ポリシーに関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。',
    },
  ],
  // TODO: 事業者名を差し替え
  businessName: '【事業者名をご記入ください】',
}

export const tokushohoPage = {
  heading: '特定商取引法に基づく表記',
  items: [
    { label: '販売事業者名', value: '【ご記入ください】' },
    { label: '運営責任者', value: '【ご記入ください】' },
    { label: '所在地', value: '【ご記入ください】' },
    { label: '電話番号', value: '【ご記入ください】' },
    { label: 'メールアドレス', value: '【ご記入ください】' },
    { label: '販売価格', value: '各サービスページに記載の金額（税込）' },
    { label: '商品代金以外の必要料金', value: '【ご記入ください（交通費等があれば）】' },
    { label: 'お支払い方法', value: '【ご記入ください】' },
    { label: 'お支払い時期', value: '【ご記入ください】' },
    { label: 'サービス提供時期', value: '【ご記入ください】' },
    { label: 'キャンセル・返金について', value: '【ご記入ください】' },
  ],
}
