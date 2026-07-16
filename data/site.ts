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
  sampleHref?: string
  sampleLabel?: string
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

export interface ReportSampleChapter {
  title: string
  guide: string
}

export interface WorkItem {
  title: string
  type: 'self' | 'client'
  category: string
  summary: string
  stack: string[]
  points: string[]
  href?: string
  hrefLabel?: string
}

export const siteMeta = {
  name: 'グラバーテック',
  title: '長崎の中小企業向けAI導入支援｜反復業務を1つから改善｜グラバーテック',
  description:
    '長崎県内の中小企業・個人事業主向けに、反復業務の診断、1業務パイロット、導入後の改善を支援します。AIを増やすのではなく、人が本来の仕事に集中できる状態を、効果を測りながらつくります。',
  url: 'https://glovertech.jp',
  ogImage: '/ogp.png',
  areaServed: '長崎県',
  // Google アナリティクス4の測定ID（G-XXXXXXXXXX）。未設定なら計測タグを出力しない。
  gaMeasurementId: '',
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
  address: '所在地：長崎県長崎市',
  links: [
    { label: 'サービス', href: '/services' },
    { label: '実績', href: '/works' },
    { label: 'コラム', href: '/articles' },
    { label: '運営者情報', href: '/about' },
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: '特定商取引法に基づく表記', href: '/tokushoho' },
  ],
  relatedSite: {
    label: '運営サイト',
    name: '補助金ナビ　長崎',
    href: 'https://nagasaki-hojokin.com',
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
    title: 'AI業務診断',
    description:
      '経営者・担当者へのヒアリングをもとに、会社の反復業務を整理し、最初に試す1業務をご提案します。',
    items: ['反復業務の洗い出し', '月間作業時間の試算', '最初に試す1業務の提案'],
  },
  {
    title: '1業務パイロット',
    description: '診断で見つかった1つの業務だけを、2〜4週間かけて実際にAIと一緒に試します。',
    items: ['入力・対象業務・出力先を1つに絞って実施', 'Before/Afterの効果測定', '最終確認は人が行います'],
  },
  {
    title: '運用・改善',
    description: '導入後の利用状況を確認し、出力内容や業務手順を継続的に改善します。',
    items: ['利用状況の確認・出力の調整', '業務手順・判断ルールの修正', '削減時間の再測定'],
  },
]

export const servicesFootnote =
  'ホームページの更新や日常のIT運用についても、内容に応じてご相談を承ります。'

export const subsidy = {
  lead: 'AI導入に使える、長崎の補助金',
  body:
    '私は『補助金ナビ 長崎』を運営していて、長崎県内の補助金情報を毎日見ています。だから、御社のAI導入や業務効率化の取り組みがどの補助金の対象になりそうか、相談の中で一緒に確認できます。',
  notes: [
    '※補助金の利用には公募期間・要件・審査があります。',
    '※申請書類の作成代行は行っておりません。',
    '※掲載時点の情報です。最新の公募状況は公式ページをご確認ください。',
  ],
}

export const plans: Plan[] = [
  {
    name: '無料相談',
    price: '0円',
    description: '現状の課題や困りごとをヒアリングします。無料相談だけで終了いただいても構いません。',
  },
  {
    name: 'AI業務診断',
    price: '3万円〜',
    description:
      'ヒアリングをもとに、反復業務を整理し、最初に試す1業務をご提案します。診断結果だけを持ち帰って終了いただいても構いません。',
    sampleHref: '/report-sample',
    sampleLabel: 'レポートの見本を見る',
  },
  {
    name: '1業務パイロット',
    price: '10万円〜',
    description: '診断で見つかった1つの業務だけを、2〜4週間かけて実際に試します。',
  },
  {
    name: '運用・改善',
    price: '月3万円〜',
    description: '導入後の運用サポートや、継続的な改善を月単位で伴走します。',
  },
]

export const pricingNote =
  '新しい業務の追加や、標準構成を超える個別開発が必要な場合は、内容を確認したうえで別途お見積りします。'

export const flowSteps: FlowStep[] = [
  {
    step: 1,
    title: '無料相談（30分）',
    description: 'オンラインで現状の課題や困りごとをお聞きします。この時点での費用はかかりません。',
  },
  {
    step: 2,
    title: 'AI業務診断',
    description:
      'ヒアリングをもとに、反復業務を整理し、最初に試す1業務をご提案します。診断結果だけを持ち帰って終了いただいても構いません。',
  },
  {
    step: 3,
    title: '納得した場合のみ、1業務パイロットへ',
    description:
      '診断の内容にご納得いただけた場合のみ、1つの業務でAI活用を試す次のステップに進みます。無理にお勧めすることはありません。',
  },
]

export const profile = {
  name: '濵口翔',
  description:
    '長崎県在住のWebエンジニア（PHP / Laravel）です。『補助金ナビ 長崎』を個人で開発・運営しながら、県内の中小企業・個人事業主のAI導入や業務効率化のご相談をお受けしています。個人だからこそ、大きな会社には頼みにくい規模のご相談にも柔軟に対応できます。打ち合わせは平日夕方・土日が中心です。',
}

export const faqItems: FaqItem[] = [
  {
    question: '平日日中の対応は可能ですか？',
    answer:
      '本業の都合上、平日日中の対応が難しい場合があります。打ち合わせは平日夕方・土日を中心にご案内しています。',
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
    question: '個人事業主でも利用できますか？',
    answer:
      'はい、ご利用いただけます。AI業務診断では、本人お一人を対象としたヒアリングも承っています。従業員数に関わらずご相談ください。',
  },
  {
    question: '診断やパイロットだけで終了できますか？',
    answer:
      'はい。無料相談、AI業務診断、1業務パイロットは、それぞれの段階で終了いただいて構いません。次の段階に進むかどうかは、内容にご納得いただけた場合のみご判断ください。',
  },
  {
    question: 'AIに仕事をすべて任せられますか？',
    answer:
      '任せられるのは、情報整理・要約・分類・下書き・候補作成など、決められた手順の実行までです。最終確認、外部への送信、契約、金額の決定、公開などの判断は、必ず人が行います。',
  },
  {
    question: '顧客情報や会社の機密情報をAIに入れても大丈夫ですか？',
    answer:
      '許可されていない環境へ、顧客情報や機密情報を入力することはありません。取り扱いが難しい情報がある場合は、その前後にある整理・確認・下書きの作業から検討します。',
  },
  {
    question: '会社の基幹システムや専用ソフトと連携できますか？',
    answer:
      '基幹システムや専用ソフトへ無理に接続することはありません。会社のPCに自由にソフトを入れられない場合もあるため、まずは基幹システムの前後にある業務（整理・確認・下書きなど）から、AIに任せられる範囲を検討します。',
  },
  {
    question: '補助金は必ず使えますか？',
    answer:
      '補助金の利用は、公募期間や要件、審査の状況によって変わるため、必ず使えるとは限りません。また、申請書類の作成代行は行っておりません。ご相談の中で、対象になりそうな補助金の情報をお伝えします。',
  },
  {
    question: '料金の目安を教えてください。',
    answer:
      '無料相談は0円、AI業務診断は3万円〜です。1業務パイロットは10万円〜、運用・改善は月3万円〜となります。新しい業務の追加や個別開発が必要な場合は、内容を確認したうえで別途お見積りします。詳しくは料金表をご覧ください。',
  },
  {
    question: '個人の方がやっているのですか？',
    answer:
      'はい。長崎県在住のWebエンジニアが個人で運営しています。だからこそ、費用を抑えながら小回りの利く支援ができます。『補助金ナビ 長崎』も同じ体制で開発・運営しています。',
  },
]

export const contact = {
  heading: 'お問い合わせ',
  description: 'まずは無料相談から。下記フォームよりお気軽にお問い合わせください。',
  formspreeEndpoint: 'https://formspree.io/f/mbdnrarj',
}

export const aboutPage = {
  heading: '運営者情報',
  items: [
    { label: '屋号', value: siteMeta.name },
    { label: '運営者名', value: profile.name },
    { label: '所在地', value: '長崎県長崎市' },
    // TODO: メールアドレスを記入
    { label: '連絡先', value: '【メールアドレスをご記入ください】' },
    // TODO: 事業内容を記入
    { label: '事業内容', value: '【事業内容をご記入ください】' },
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

const disclosureOnRequest =
  'お取引やお問い合わせの際に必要な場合は、ご請求いただければ遅滞なく開示いたします。'

export const tokushohoPage = {
  heading: '特定商取引法に基づく表記',
  items: [
    { label: '事業者名', value: `${siteMeta.name}（${profile.name}）` },
    { label: '所在地', value: disclosureOnRequest },
    { label: '電話番号', value: disclosureOnRequest },
    // TODO: メールアドレスを記入
    { label: '連絡先', value: '【メールアドレスをご記入ください】' },
    {
      label: '販売価格',
      value: `${plans.map((plan) => `${plan.name} ${plan.price}`).join('／')}`,
    },
    // TODO: お支払い方法・時期を記入
    { label: '代金の支払方法・時期', value: '【お支払い方法・時期をご記入ください】' },
    // TODO: サービス提供時期を記入
    { label: 'サービス提供時期', value: '【提供時期をご記入ください】' },
    // TODO: キャンセルについて記入
    { label: 'キャンセルについて', value: '【キャンセルについてご記入ください】' },
  ],
}

export const reportSamplePage = {
  heading: 'AI業務診断レポートの見本',
  lead: '実際にお渡しするAI業務診断レポートの構成見本です。内容はヒアリング内容に応じて変わります。',
  // TODO: 氏名・作成日を実際のレポート発行時に差し替え
  coverTitle: 'AI業務診断',
  nameLabel: '【後で記入】様',
  dateLabel: '【後で記入】',
  chapters: [
    {
      title: '1. 現状整理',
      guide: 'ヒアリングした業務の流れと反復業務一覧',
    },
    {
      title: '2. AI化の優先順位',
      guide: '人間が担当する部分とAIに任せられる候補、優先順位',
    },
    {
      title: '3. 改善の方向性',
      guide: '最初に試す1業務の提案と費用対効果の仮説',
    },
    {
      title: '4. 使えそうな補助金',
      guide: '対象になりそうな制度と注意点',
    },
    {
      title: '5. 進め方の提案',
      guide: '1業務パイロットへの進め方と概算スケジュール',
    },
  ] satisfies ReportSampleChapter[],
}

export const worksPage = {
  heading: '実績',
  homeLead: '自社サービスの開発・運営から、長崎県内の店舗・個人事業主向けの受託開発まで。',
  lead: 'これまでに開発・運営してきたサービス・サイトの一部をご紹介します。クライアント様の案件は屋号を伏せた形で掲載しています。',
  items: [
    {
      title: '補助金ナビ　長崎',
      type: 'self',
      category: '自社サービス',
      summary:
        '長崎・佐賀・熊本の中小企業・個人事業主向けに、補助金・助成金の情報を毎日更新して届ける検索サイト。個人で企画・開発・運営し、3県への展開まで行いました。',
      stack: ['PHP', 'Laravel', 'Filament', 'MySQL'],
      points: ['マルチテナント構成で3地域に展開', '公開中の補助金情報を日々更新・管理'],
      href: footer.relatedSite.href,
      hrefLabel: 'サイトを見る',
    },
    {
      title: '和洋菓子店のホームページ＋商品管理システム',
      type: 'client',
      category: 'クライアント案件（長崎県内）',
      summary:
        '老舗和洋菓子店向けに、ブランドの世界観を再現したホームページと、店主自身が商品・お知らせ・写真を更新できる管理画面をセットで開発しました。',
      stack: ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Docker'],
      points: ['商品・お知らせ・FAQ・写真をノーコードで更新できる管理画面', '本番サーバーの構築・運用まで一貫して担当'],
    },
    {
      title: '結婚式の招待・出欠管理サイト',
      type: 'client',
      category: 'クライアント案件（長崎県内）',
      summary:
        '新郎新婦の結婚式向けに、招待状代わりとなる特設サイトを開発。ゲストの出欠回答やプロフィール紹介、写真掲載などの機能を実装しました。',
      stack: ['PHP', 'Laravel'],
      points: ['ゲストの出欠管理・写真アップロード機能', 'スマートフォンからのHEIC画像アップロードにも対応'],
    },
    {
      title: '接骨院のホームページ',
      type: 'client',
      category: 'クライアント案件（長崎県内）',
      summary:
        '交通事故治療を専門とする接骨院向けに、フルスクラッチのWordPressテーマを開発。院の運営担当者が管理画面から診療時間や案内文をノーコードで更新できる設計にしました。',
      stack: ['WordPress', 'PHP'],
      points: ['カスタマイザーで診療時間・院名などをノーコード編集可能', '交通事故・むちうち治療に特化した案内ページを構成'],
    },
  ] satisfies WorkItem[],
}
