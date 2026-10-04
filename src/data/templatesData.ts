export interface MessageTemplate {
  id: string;
  type: 'funeral_notice' | 'wedding_notice' | 'funeral_thankyou' | 'wedding_thankyou' | 'absence_condolence' | 'absence_congratulation';
  name: string;
  category: '조사' | '경사';
  description: string;
  template: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
  }[];
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'tmpl-funeral-notice',
    type: 'funeral_notice',
    name: '부고 알림 (동문회 / 지인 전달용)',
    category: '조사',
    description: '빈소 위치, 발인 일시, 상주 및 계좌번호를 깔끔하게 정리하여 카카오톡이나 문자로 전송하기에 최적화된 표준 양식입니다.',
    fields: [
      { key: 'deceased', label: '고인과의 관계 및 존함', placeholder: '故 홍길동 (모친)', defaultValue: '故 이정순 여사 (모친)' },
      { key: 'chiefMourner', label: '상주 (동문 이름 및 관계)', placeholder: '아들 김철수(94학번), 딸 김영희', defaultValue: '아들 김철수 (고려대 컴퓨터학과 94학번)' },
      { key: 'passingDate', label: '별세 일시', placeholder: '2026년 10월 4일 오전 6시 별세', defaultValue: '2026년 10월 4일(일) 오전 별세' },
      { key: 'funeralHall', label: '장례식장 및 빈소', placeholder: '고려대학교 안암병원 장례식장 302호실', defaultValue: '고려대학교 안암병원 장례식장 301호' },
      { key: 'funeralDate', label: '발인 일시 및 장지', placeholder: '2026년 10월 6일(화) 오전 8시 / 서울추모공원', defaultValue: '2026년 10월 6일(화) 오전 08시 00분 / 서울시립승화원' },
      { key: 'account', label: '마음 전하실 계좌', placeholder: '하나은행 123-456-789012 (예금주: 김철수)', defaultValue: '하나은행 123-456-789012 (예금주: 김철수)' },
      { key: 'contact', label: '연락처', placeholder: '010-1234-5678', defaultValue: '010-1234-5678' }
    ],
    template: `[부고 알림]

삼가 알려드립니다.
고려대학교 컴퓨터학과 94학번 {chiefMourner} 동기의 {deceased}께서 숙환으로 별세하셨기에 삼가 알려드립니다.

코로나 및 여러 사정으로 조문이 어려우신 분들을 위해 비대면으로 마음 전하실 수 있도록 계좌를 함께 안내해 드립니다. 고인의 명복을 빌어주시기 바랍니다.

■ 고인: {deceased}
■ 별세 일시: {passingDate}
■ 빈소: {funeralHall}
■ 발인: {funeralDate}
■ 상주: {chiefMourner}
■ 마음 전하실 곳: {account}
■ 연락처: {contact}

* 고려대학교 컴퓨터학과 94학번 동기회 드림`
  },
  {
    id: 'tmpl-wedding-notice',
    type: 'wedding_notice',
    name: '결혼식 안내 (동문 모임 / 지인용)',
    category: '경사',
    description: '일시, 예식 장소, 대중교통 및 마음 전하실 곳을 담아 부담 없이 정중하게 알리는 서식입니다.',
    fields: [
      { key: 'groom', label: '신랑 이름 및 관계', placeholder: '신랑 홍길동 (또는 김철수 동기의 장남 홍길동)', defaultValue: '김철수 (고려대 컴퓨터학과 94학번)' },
      { key: 'bride', label: '신부 이름', placeholder: '신부 이영희', defaultValue: '이영희' },
      { key: 'date', label: '예식 일시', placeholder: '2026년 11월 14일(토) 오후 1시', defaultValue: '2026년 11월 14일(토) 오후 1시 30분' },
      { key: 'location', label: '예식 장소 및 홀', placeholder: '더플라자호텔 그랜드볼룸', defaultValue: '더플라자호텔 그랜드볼룸 (지하 1층)' },
      { key: 'link', label: '모바일 청첩장 링크', placeholder: 'https://...', defaultValue: 'https://wedding.kucs94.com/sample' },
      { key: 'account', label: '축하의 마음 전하실 곳', placeholder: '국민은행 000-000-000000', defaultValue: '국민은행 123-45-67890 (예금주: 김철수)' }
    ],
    template: `[화혼 안내]

새로운 시작을 함께 축복해 주십시오.

저희 두 사람이 서로를 믿고 평생을 함께할 약속을 맺게 되었습니다.
바쁘신 일정 중에도 귀한 걸음 하시어 저희의 새로운 출발을 축복해 주시면 더없는 기쁨으로 간직하겠습니다.

■ 일시: {date}
■ 장소: {location}
■ 신랑: {groom}
■ 신부: {bride}
■ 모바일 청첩장: {link}
■ 축하 마음 전하실 곳: {account}

* 참석이 어려우시더라도 마음으로 축복해 주시는 것만으로도 큰 힘이 됩니다.
감사합니다.`
  },
  {
    id: 'tmpl-funeral-thankyou',
    type: 'funeral_thankyou',
    name: '장례 후 조문 감사 답례문',
    category: '조사',
    description: '장례를 모두 마친 후 슬픔을 함께 나누고 위로해 주신 분들께 전하는 가장 품격 있는 인사글입니다.',
    fields: [
      { key: 'senderName', label: '보내는 이 (상주)', placeholder: '김철수 배상', defaultValue: '고려대 컴퓨터학과 94학번 김철수 배상' },
      { key: 'deceased', label: '고인 호칭', placeholder: '저희 어머님(故 이정순 여사)', defaultValue: '저희 어머님(故 이정순 여사)' }
    ],
    template: `[감사의 말씀]

삼가 인사 말씀 올립니다.

공사다망하신 중에도 지난 {deceased} 장례에 따뜻한 위로와 조의를 베풀어 주시어 깊은 감사를 드립니다.

보내주신 온정 덕분에 어머님을 편안한 곳으로 잘 모실 수 있었습니다. 경황이 없어 일일이 찾아뵙고 인사드리지 못하고 우선 글로써 감사의 마음을 전함을 너그러이 혜량해 주시기 바랍니다.

베풀어 주신 은혜 가슴 깊이 간직하며, 댁내에 늘 건강과 평안이 함께하시기를 진심으로 기원합니다.

2026년 10월
{senderName}`
  },
  {
    id: 'tmpl-wedding-thankyou',
    type: 'wedding_thankyou',
    name: '결혼식 후 하객 감사 답례문',
    category: '경사',
    description: '예식을 무사히 치르고 신혼여행 출발 전이나 다녀온 후 하객들에게 전하는 감사 인사말입니다.',
    fields: [
      { key: 'couple', label: '신랑 신부 이름', placeholder: '신랑 김철수 · 신부 이영희 올림', defaultValue: '신랑 김철수(고려대 컴공 94) · 신부 이영희 올림' }
    ],
    template: `[감사의 글]

따뜻한 축복 속에 결혼식을 무사히 마쳤습니다.

바쁘신 주말 일정 중에도 저희 두 사람의 첫 출발을 축하해 주시고 자리를 빛내주셔서 진심으로 머리 숙여 감사드립니다.

보내주신 소중한 축하와 격려의 말씀을 마음에 깊이 새기며, 서로 아끼고 배려하며 행복하고 화목한 가정을 꾸려나가겠습니다.

늘 건강하시고 댁내에 늘 행복과 기쁨이 가득하시기를 소망합니다.
조만간 찾아뵙고 정식으로 인사드리겠습니다.

{couple}`
  },
  {
    id: 'tmpl-absence-condolence',
    type: 'absence_condolence',
    name: '조문 불참 시 송금 및 위로 문자',
    category: '조사',
    description: '부득이한 사정이나 해외 체류, 지방 출장 등으로 직접 빈소를 찾지 못할 때 송금과 함께 전하는 정중한 위로의 글입니다.',
    fields: [
      { key: 'friend', label: '상주(동기) 이름', placeholder: '철수야', defaultValue: '철수야' },
      { key: 'sender', label: '보내는 이', placeholder: '동기 민우가', defaultValue: '94학번 동기 이민우가' }
    ],
    template: `[삼가 위로의 말씀 전합니다]

{friend}, 갑작스러운 비보에 마음이 너무 아프고 황망하다.
직접 찾아뵙고 손잡으며 위로의 말을 전해야 마땅하나, 부득이한 사정으로 조문하지 못하여 진심으로 송구스럽고 미안한 마음뿐이다.

약소하지만 멀리서나마 고인의 가시는 길에 작은 정성을 보탠다.
어머님께서 편히 영면하시기를 두 손 모아 기도하며, 너와 가족분들도 슬픔 중에도 부디 건강 잘 챙기길 바란다.

장례 잘 마무리하고 마음 좀 추스르면 꼭 얼굴 보자.
삼가 고인의 명복을 빈다.

- {sender} -`
  },
  {
    id: 'tmpl-absence-congratulation',
    type: 'absence_congratulation',
    name: '결혼식 불참 시 축하 및 송금 문자',
    category: '경사',
    description: '개인 사정으로 결혼식에 참석하지 못할 때 진심 어린 축하와 축의금을 전하는 메시지입니다.',
    fields: [
      { key: 'friend', label: '동기/친구 이름', placeholder: '철수야', defaultValue: '철수야' },
      { key: 'sender', label: '보내는 이', placeholder: '동기 박준형', defaultValue: '94 동기 박준형' }
    ],
    template: `[결혼을 진심으로 축하한다!]

{friend}, 인생에서 가장 빛나고 아름다운 결혼식을 진심으로 축하해!
직접 예식장에 가서 두 사람의 멋진 출발을 축하해주고 박수 쳐줘야 하는데, 피치 못할 일정으로 함께하지 못해 정말 미안하다.

마음 가득 담아 작은 축의를 전하니, 둘이서 맛있는 것 먹고 예쁜 추억 많이 만들길 바라.
두 사람이 함께 걸어갈 앞날에 늘 사랑과 축복이 가득하길 진심으로 응원한다!

신혼여행 건강히 잘 다녀오고 돌아오면 밥 한 끼 꼭 하자!

- {sender} 올림 -`
  }
];
