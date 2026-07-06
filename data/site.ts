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
  title: '長崎の中小企業向けAI導入支援｜補助金活用で始める業務効率化',
  description:
    '長崎県内の中小企業・個人事業主向けにAI導入と業務効率化を伴走支援。ChatGPT等のAI活用、業務自動化、HP運用を補助金活用の提案とセットで。初回相談無料。',
  // TODO: 本番ドメインに差し替え
  url: 'https://example.com',
  ogImage: '/ogp.png',
  areaServed: '長崎県',
}

export const hero = {
  title: 'AIで、その手作業をなくしませんか？',
  subtitle:
    '補助金の活用も見据えた、長崎のAI導入・業務効率化支援。相談だけで終わらせず、実装までお手伝いします。',
  ctaLabel: '無料相談を申し込む（30分・オンライン）',
  ctaHref: '#contact',
}

export const problems: Problem[] = [
  {
    title: '毎日の手作業',
    description:
      '同じ入力や集計、転記作業に、毎日少しずつ時間が取られていませんか。',
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
  heading: '補助金の強み',
  lead: '導入費用は、補助金でまかなえる場合があります',
  body:
    '「補助金ナビ　長崎」の運営者として、日頃から長崎県内の補助金情報に触れています。AI導入や業務効率化の取り組みが、どの補助金の対象になりそうか、相談の中で一緒に確認していきます。',
  notes: [
    '※補助金の利用には公募期間・要件・審査があります。',
    '※申請書類の作成代行は行っておりません。',
  ],
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
      '長崎県内を中心に対応しています。オンラインでの相談・打ち合わせも可能です。',
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
